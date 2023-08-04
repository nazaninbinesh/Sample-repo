import React from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import PickerPage from "./components/PickerPage/PickerPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import { Octokit } from "octokit";

type CurrentPageType = "PickerPage" | "reviewPage" | "resultsPage";
interface ReviewTableDataType {
  searchKeywords: string;
  username: string;
  context: string;
}

interface ResultTableDataType {
  searchKeywords: string;
  username: string;
  context: string;
  searchResults: string;
}

function App() {
  const [currentPage, setCurrentPage] =
    React.useState<CurrentPageType>("PickerPage");
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [reviewData, setReviewData] =
    React.useState<Array<ReviewTableDataType>>();
  const [resultData, setResultData] =
    React.useState<Array<ResultTableDataType>>();
  const [errors, setErrors] = React.useState<Object[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const navigate = useNavigate();

  const octokit = new Octokit({
    auth: "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",
  });

  //Using library like papaparse is recommended
  const parseCSV = React.useCallback(async (file: File, pageNumber: number) => {
    setLoading(true);
    const text = await file.text();
    const lines = text.split("\n");
    //const itemsPerPage = 15; // Set the number of items to be processed per page

    // Calculate the start and end indexes for the current page
    //const startIndex = (pageNumber - 1) * itemsPerPage;
    //const endIndex = Math.min(startIndex + itemsPerPage, lines.length);

    // Process the CSV data for the current page
    const currentPageData = lines.map((row) => {
      const [searchKeywords, username, context] = row.split(",");
      return { searchKeywords, username, context };
    });

    // Update the state with the current page's data
    setReviewData(currentPageData);
    navigate("/review", { state: currentPageData });
    setLoading(false);
  }, []);

  //find duplicated onjects
  function objectsAreEqual(
    obj1: ReviewTableDataType,
    obj2: ReviewTableDataType
  ): boolean {
    return (
      obj1.searchKeywords === obj2.searchKeywords &&
      obj1?.username?.trim() === obj2?.username?.trim() &&
      obj1?.context?.trim() === obj2?.context?.trim()
    );
  }

  function findDuplicateObjects(
    jsonArray: ReviewTableDataType[]
  ): { object: ReviewTableDataType; index: number }[] {
    const duplicates: { object: ReviewTableDataType; index: number }[] = [];

    jsonArray?.forEach((obj, index) => {
      for (let i = index + 1; i < jsonArray.length; i++) {
        if (objectsAreEqual(obj, jsonArray[i])) {
          duplicates.push({ object: obj, index });
          setErrors((prevErrors) => [
            ...prevErrors,
            index,
            // `Error: Duplicated rows found in ${index + 1}.`,
          ]);
          break;
        }
      }
    });

    return duplicates;
  }

  // find the objects with Empty searchKeywords
  function findObjectsWithEmptySearchKeywords(
    jsonArray: ReviewTableDataType[]
  ): { object: ReviewTableDataType; index: number }[] {
    const blanks: { object: ReviewTableDataType; index: number }[] = [];

    jsonArray?.forEach((obj, index) => {
      if (obj.searchKeywords === "") {
        blanks.push({ object: obj, index });
        setErrors((prevErrors) => [
          ...prevErrors,
          index,
          // `Error: Empty search keywords found in rows ${index + 1}.`,
        ]);
      }
    });

    return blanks;
  }

  const deleteRowsHandler = () => {
    setLoading(true);
    const cleanData = reviewData?.filter((row, index) => {
      if (!errors.includes(index)) {
        return row;
      }
    });
    setReviewData(cleanData);
    setErrors([]);
    setLoading(false);
  };

  React.useEffect(() => {
    if (currentPage === "PickerPage" && selectedFile && !reviewData) {
      parseCSV(selectedFile, pageNumber);
    } else if (reviewData?.length === 0) {
      setCurrentPage("PickerPage");
    } else if (
      currentPage === "PickerPage" &&
      reviewData &&
      reviewData.length > 0
    ) {
      setCurrentPage("reviewPage");
    } else if (currentPage === "reviewPage" && resultData && resultData.length > 0) {
      setCurrentPage("resultsPage");
    }
  }, [currentPage, selectedFile, parseCSV, reviewData, resultData, pageNumber]);

  React.useEffect(() => {
    console.log(reviewData);
    findDuplicateObjects(reviewData);
    findObjectsWithEmptySearchKeywords(reviewData);
  }, [reviewData]);

  const browseHandling = (event: {
    target: { files: React.SetStateAction<File | undefined>[] };
  }) => {
    setSelectedFile(event.target.files?.[0]);
    parseCSV(event.target.files?.[0], pageNumber);
  };

  const searchHandler = () => {
    setLoading(true)
    reviewData.forEach((row) => {
      octokit.rest.search
        .repos({
          q: encodeURIComponent(row.searchKeywords),
        })
        .then(({ data: { total_count } }) => {
          const result =
            total_count > 0
              ? total_count + " repositories found"
              : "No repositories found";
          setResultData((prevResultData) => [
            ...(prevResultData ?? []),
            { ...row, searchResults: result },
          ]);
          navigate("/results", { state: result });
          setLoading(false);
        });
    });
  };

  const backButtonHandler = () => {
    debugger;
    setReviewData([]);
    setResultData([]);
    setErrors([]);
    setCurrentPage("PickerPage");
    navigate("/");    
  };

  return (
    <>
      <div className="container mx-auto m-11">
        {currentPage !== "PickerPage" && !loading &&(
          <button
            className="mb-4 block text-[#6941C6]"
            onClick={backButtonHandler}
          >
            &#8592; Upload New CSV
          </button>
        )}

        <div className="shadow-lg bg-white rounded-xl shadow-[0_1px_3px_0px_rgba(16, 24, 40, 0.1)]">
          <div className="flex flex-col items-center justify-center">
            <Routes>
              <Route
                path="/"
                element={
                  <PickerPage
                    browseHandling={browseHandling}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/review"
                element={
                  <ReviewPage
                    data={reviewData}
                    errors={errors}
                    loading={loading}
                    octokit={octokit}
                    deleteRowsHandler={deleteRowsHandler}
                    searchHandler={searchHandler}
                  />
                }
              />
              <Route
                path="/results"
                element={<ResultsPage data={reviewData} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
