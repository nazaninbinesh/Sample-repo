import React from "react";
import Browse from "../Browse/Browse";
import Spinner from "../Spinner/Spinner";


interface PickerPageProps {
    browseHandling: any,
    loading:boolean
}

const PickerPage: React.FC<PickerPageProps> = ({browseHandling,loading}) => {  
 
  return (
    <div className="relative w-full">
      <Browse onChange={browseHandling} disabled={loading ? true : false} />
      {loading && (
        <Spinner className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" />
      )}
    </div>
  );
};

export default PickerPage;
