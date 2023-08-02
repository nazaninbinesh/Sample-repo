import TableDataColumn from "./TableDataColumn";
import TableHeaderColumn from "./TableHeaderColumn";

interface TablePropsType {
    data: Array<Record<string, string>>;
    title: string;
    buttons: React.ReactNode;
  }
  
  function Table({ data, title, buttons }: TablePropsType) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{buttons}</div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {Object.entries(data[0]).map(([key, value]) => (
                      <TableHeaderColumn key={key} value={key} />
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={index}>
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