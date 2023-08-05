import TableDataColumn from "./TableDataColumn";
import TableHeaderColumn from "./TableHeaderColumn";

interface TablePropsType {
    data: Array<Record<string, string>>;
    title: string;
    error: Array<any>;
    buttons: React.ReactNode;
    timeEstimation:string
  }
  
  function Table({ data, title, error, buttons, timeEstimation }: TablePropsType) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h1>
            <h6>{timeEstimation}</h6>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{buttons}</div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 overflow-y-scroll">
                <thead className="sticky top-0">
                 <tr>
                    {Object.entries(data[0]).map(([key, index]) => (
                      <TableHeaderColumn key={index} value={key} />
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200" >
                  {data.map((row, index) => (
                    <tr key={index} className={error?.includes(index) ? 'bg-red-50' : ''}>
                      {Object.entries(row).map(([key, value]) => (
                        <TableDataColumn key={key} value={value} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Table;