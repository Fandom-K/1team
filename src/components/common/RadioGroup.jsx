import "../../styles/common/RadioGroup.css";

const RadioGroup = ({ children, onClick }) => {
  return (
    <div className="RadioGroup" onClick={onClick}>
      {children}
    </div>
  );
};

export default RadioGroup;
