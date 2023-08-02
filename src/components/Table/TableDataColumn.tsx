interface TableDataColumnPropsType {
    value: string;
  }
  
  const TableDataColumn = ({ value }: TableDataColumnPropsType) => {
    return (
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
        {value}
      </td>
    );
  };

  export default TableDataColumn;