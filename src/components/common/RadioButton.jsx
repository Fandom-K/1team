import "/src/styles/common/RadioButton.css";

const RadioButton = ({ value, checked, onChange, onClick }) => {
  return (
    <div className={`radio-button`} onClick={onClick}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="radio-input"
        readOnly
      />
      <span className="radio-custom"></span>
    </div>
  );
};

export default RadioButton;
