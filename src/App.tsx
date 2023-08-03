import React from "react";
import classNames from "classnames";
import { Octokit } from "octokit";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";
import Browse from "./components/Browse/Browse";

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

  const parseCSV = React.useCallback(async (file: File) => {
    const text = await file.text();
    console.log("Text", text.split("\n").map((row) => row.trim()));
    const parsed = text.split("\n").map((row) => row.trim()).filter((row) => row !== ",,,,,,,,,").map((row) => {
      const [searchKeywords, username, context] = row.split(",");
      return { searchKeywords, username, context };
    });

    setReviewData(parsed);
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
          duplicates.push({object: obj, index});
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
      parseCSV(selectedFile);
    } else if (currentPage === "PickerPage" && reviewData) {
      setCurrentPage("reviewPage");
    } else if (currentPage === "reviewPage" && resultData) {
      setCurrentPage("resultsPage");
    }
  }, [currentPage, selectedFile, parseCSV, reviewData, resultData]);

  const deleteRowsHandler = ()=>{
    const cleanData = reviewData?.filter((row,index)=>{
      if(!errors.includes(index)){
        return row;
      }
    })
    setReviewData(cleanData);
    setErrors([]);
  }

  React.useEffect(() => {
    findDuplicateObjects(reviewData);
    findObjectsWithEmptySearchKeywords(reviewData);   
  }, [reviewData]);

  const octokit = new Octokit({ auth: "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" });

  return (
    <div className="container mx-auto">
      <div className="m-11 shadow-lg bg-white rounded-xl shadow-[0_1px_3px_0px_rgba(16, 24, 40, 0.1)]">
        <div className="flex flex-col items-center justify-center">
          {currentPage === "PickerPage" && (
            <>
              {/* <input
              className={classNames(
                // button colors
                "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100",
                // button shape and spacing
                "file:rounded-lg file:rounded-tr-none file:rounded-br-none",
                "file:px-4 file:py-2 file:mr-4 file:border-none",
                // overall input styling
                "hover:cursor-pointer border rounded-lg text-gray-400"
              )}
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0])}
              accept=".csv"
            /> */}
              <Browse
                onChange={(event) => setSelectedFile(event.target.files?.[0])}
              />
            </>
          )}
          {currentPage === "reviewPage" && reviewData && (
            <>
              <Table
                data={reviewData}
                title="Review CSV File"
                error={errors}
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
                      className="border-2 border-indigo-200 bg-indigo-200 rounded-md px-3 py-2 text-center text-white text-sm font-semibold mt-5 mr-5	shadow-sm"
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
            <Table data={resultData} title="Results" />
          )}
        </div>
      </div>
    </div>
  );
}
// interface ButtonPropsType {
//   title: string;
//   onClick: () => void;
// }

// const Button = ({ title, onClick }: ButtonPropsType) => {
//   return (
//     <button
//       type="button"
//       className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//       onClick={onClick}
//     >
//       {title}
//     </button>
//   );
// };
// interface TablePropsType {
//   data: Array<Record<string, string>>;
//   title: string;
//   buttons: React.ReactNode;
// }

// function Table({ data, title, buttons }: TablePropsType) {
//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold leading-6 text-gray-900">
//             {title}
//           </h1>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{buttons}</div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <table className="min-w-full divide-y divide-gray-300">
//               <thead>
//                 <tr>
//                   {Object.entries(data[0]).map(([key, value]) => (
//                     <TableHeaderColumn key={key} value={key} />
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {data.map((row, index) => (
//                   <tr key={index}>
//                     {Object.entries(row).map(([key, value]) => (
//                       <TableDataColumn key={key} value={value} />
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface TableDataColumnPropsType {
//   value: string;
// }

// const TableDataColumn = ({ value }: TableDataColumnPropsType) => {
//   return (
//     <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
//       {value}
//     </td>
//   );
// };

// interface TableHeaderColumnPropsType {
//   value: string;
// }

// const TableHeaderColumn = ({ value }: TableHeaderColumnPropsType) => {
//   return (
//     <th
//       scope="col"
//       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//     >
//       {value}
//     </th>
//   );
// };

export default App;
