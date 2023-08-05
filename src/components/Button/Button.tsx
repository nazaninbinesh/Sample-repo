interface ButtonPropsType {
  title: string;
  className: string;
  disabled: boolean;
  onClick: () => void;
}

const Button = ({ title, className, onClick, disabled }: ButtonPropsType) => {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
