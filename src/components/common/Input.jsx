import "/src/styles/common/Input.css";

const Input = ({ placeholder, error, value = "", onChange = () => {} }) => {
  const errorClass = error ? " Error" : "";

  return (
    <div className={`Input${errorClass} font-bold-20-line26`}>
      <input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
