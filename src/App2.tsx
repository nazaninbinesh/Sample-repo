import React from "react";
//import Papa from "papaparse";
import { Octokit } from "octokit";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";
import Browse from "./components/Browse/Browse";
import Spinner from "./components/Spinner/Spinner";

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

function App2() {
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
  }, []);

  const browseHandling = (event: {
    target: { files: React.SetStateAction<File | undefined>[] };
  }) => {
    setSelectedFile(event.target.files?.[0]);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    //  Papa.parse(event.target.files[0], {
    //   header: true,
    //   skipEmptyLines: true,
    //   //chunk: chunkComplete,
    //  chunkSize: 50,
    //  worker: true,
    //  //complete: parseComplete,
    //   complete: function (results) {
    //     setReviewData( results.data);
    //   },
    // });
    //setLoading(true);
  };

  const handleScroll = () => {
    const isBottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (isBottom && !loading) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

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

  React.useEffect(() => {
    if (currentPage === "PickerPage" && selectedFile && !reviewData) {
      parseCSV(selectedFile, pageNumber);
    } else if (currentPage === "PickerPage" && reviewData) {
      setLoading(false);
      setCurrentPage("reviewPage");
    } else if (currentPage === "reviewPage" && resultData) {
      setCurrentPage("resultsPage");
    }
  }, [currentPage, selectedFile, parseCSV, reviewData, resultData, pageNumber]);

  // React.useEffect(() => {
  //   parseCSV(selectedFile, pageNumber);
  // }, [pageNumber,parseCSV]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    console.log(reviewData);
    findDuplicateObjects(reviewData);
    findObjectsWithEmptySearchKeywords(reviewData);
  }, [reviewData]);

  const octokit = new Octokit({
    auth: "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",
  });

  return (
    <>
      <div className="container mx-auto m-11">
        {currentPage === "reviewPage" && <a className="mb-4 block text-[#6941C6]" href="#">Upload New CSV</a>}
        <div className="shadow-lg bg-white rounded-xl shadow-[0_1px_3px_0px_rgba(16, 24, 40, 0.1)]">
          <div className="flex flex-col items-center justify-center">
            {currentPage === "PickerPage" && (
              <div className="relative w-full">
                <Browse
                  onChange={browseHandling}
                  disabled={loading ? true : false}
                />
                {loading && (
                  <Spinner className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" />
                )}
              </div>
            )}
            {currentPage === "reviewPage" && reviewData && (
              <>
                <Table
                  data={reviewData}
                  title="Review CSV File"
                  error={errors}
                  timeEstimation=""
                  buttons={
                    <>
                      {errors && errors.length > 0 && (
                        <Button
                          title={`Delete ${errors.length} Errors`}
                          onClick={deleteRowsHandler}
                          className="border-2 border-orange-300 rounded-md px-3 py-2 text-center text-orange-700 text-sm font-semibold mt-5	 mr-5	shadow-sm hover:bg-orange-300  hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                      )}
                      <Button
                        title="Start Searching"
                        className={`border-2 border-indigo-200 rounded-md px-3 py-2 text-center text-white text-sm font-semibold mt-5 mr-5 shadow-sm ${
                          errors.length === 0
                            ? "bg-violet-600"
                            : "bg-indigo-200"
                        }`}
                        onClick={() => {
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
                              });
                          });
                        }}
                      />
                    </>
                  }
                />
                {/* <ul>
                {errors &&
                  errors.map((err) => {
                    return <li>{err}</li>;
                  })}
              </ul> */}
              </>
            )}
            {currentPage === "resultsPage" && (
              <Table
                data={resultData}
                title="Search Results"
                timeEstimation="Finish estimated time: 2 hours and 31 minutes"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App2;
