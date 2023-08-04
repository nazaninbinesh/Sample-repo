import React from "react";
import Table from "../Table/Table";

interface ResultDataType { 
  data: any;  
}

const ResultsPage: React.FC<ResultDataType> = ({data}) => {
  return (
    <>
      <Table
        data={data}
        title="Search Results"
        timeEstimation="Finish estimated time: 2 hours and 31 minutes" error={[]} buttons={undefined}              />
    </>
  );
};

export default ResultsPage;
