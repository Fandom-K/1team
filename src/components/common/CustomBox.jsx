import "/src/styles/common/CustomBox.css";

const CustomBox = ({ className = "", children, width, ...props }) => {
  const { error } = props;

  return (
    <div
      className={`CustomBox ${className}${error ? " error" : ""}`}
      style={width ? { width } : {}}
    >
      {children}
    </div>
  );
};

export default CustomBox;
