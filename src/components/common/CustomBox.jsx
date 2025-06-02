import "/src/styles/common/CustomBox.css";

const CustomBox = ({ className = "", children, ...props }) => {
  const { error } = props;

  return (
    <div className={`CustomBox ${className}${error ? " error" : ""}`}>
      {children}
    </div>
  );
};

export default CustomBox;
