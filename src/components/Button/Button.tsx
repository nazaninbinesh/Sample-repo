interface ButtonPropsType {
    title: string;
    className: string;
    disabled: boolean
    onClick: () => void;
  }
  
  const Button = ({ title, className, onClick , disabled }: ButtonPropsType) => {
    return (
      <button
        type="button"
        //className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    );
  };

  export default Button;