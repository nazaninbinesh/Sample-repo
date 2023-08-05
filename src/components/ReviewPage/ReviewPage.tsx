import React from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";

interface ReviewDataType {
  data: any;
  errors: any;
  deleteRowsHandler: any;
  searchHandler: any;
  octik: any;
  loading: boolean;
}

const ReviewPage: React.FC<ReviewDataType> = ({
  data,
  errors,
  deleteRowsHandler,
  octik,
  loading,
  searchHandler,
}) => {
  return (
    <>
      <>
        <Table
          data={data}
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
                  disabled={false}
                />
              )}
              <Button
                title="Start Searching"
                className={`border-2 border-indigo-200 rounded-md px-3 py-2 text-center text-white text-sm font-semibold mt-5 mr-5 shadow-sm ${
                  errors.length === 0 ? "bg-violet-600" : "bg-indigo-200"
                }`}
                onClick={searchHandler}
                disabled={errors?.length > 0 ? true : false}
              />
            </>
          }
        />
        {/* Error could be shown here but the UI Figma doesn't support it */}
        {/* <ul>
                {errors &&
                  errors.map((err) => {
                    return <li>{err}</li>;
                  })}
              </ul> */}
      </>
    </>
  );
};

export default ReviewPage;
