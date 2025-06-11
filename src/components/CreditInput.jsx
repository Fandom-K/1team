import Input from "./common/Input";
import "/src/styles/common/Input.css";
import "/src/styles/CreditInput.css";
import creditIcon from "/src/assets/icons/credit_icon.png";

const CreditInput = ({
  value,
  placeholder,
  onChange,
  error = "",
  errorMessage = "",
}) => {
  const handleChange = (e) => {
    // 숫자가 아니면 공백 처리
    const inputValue = e.target.value.replace(/[^0-9]/g, "");

    if (inputValue.length <= 6) {
      // 아래 코드 실행 전에는 target.value = 문자가 입력된 상태.
      onChange({
        target: {
          value: inputValue,
        },
      });
    }
  };

  return (
    <div className="CreditInput">
      <div className="credit-input">
        <Input
          className="credit-input-input"
          error={error}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
        <div className="credit-input-icon">
          <img src={creditIcon} />
        </div>
      </div>
      {errorMessage && <div className="credit-input-error">{errorMessage}</div>}
    </div>
  );
};

export default CreditInput;
