import "../styles/ExamplePage.css";
import Input from "/src/components/common/Input.jsx";
import CreditInput from "/src/components/CreditInput.jsx";
import { useState } from "react";
import RadioButton from "../components/common/RadioButton";
import CustomBox from "../components/common/CustomBox";
import creditIcon from "/src/assets/icons/credit_icon.png";

const ExamplePage = () => {
  /*
   * input
   */
  const [creditValue, setCreditValue] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreditChange = (e) => {
    const value = e.target.value;
    setCreditValue(value);

    // myCredit 가져오기
    const myCredit = 100;
    if (value && Number.parseInt(value) > myCredit) {
      setError("error");
      setErrorMessage("갖고 있는 크레딧보다 더 많이 후원할 수 없어요");
    } else {
      setError("");
      setErrorMessage("");
    }
  };

  /*
   * radio
   */
  const [selectedCredit, setSelectedCredit] = useState("100");

  const creditOptions = [
    { value: "100", label: "100" },
    { value: "500", label: "500" },
    { value: "1000", label: "1000" },
  ];

  const handleCreditClick = (point) => {
    setSelectedCredit(point.toString());
  };

  return (
    <div className="ExamplePage">
      <h1 style={{ color: "#ffffff" }}>INPUT</h1>
      <div className="custom-input">
        <CustomBox className="custombox-responsive font-bold-20-line26">
          <input className="custombox-input" placeholder="CustomBoxInput" />
        </CustomBox>
        <Input placeholder={"Input"} />
        <Input error placeholder={"Input error"} />
        <CreditInput
          value={creditValue}
          placeholder={"크레딧 입력"}
          onChange={handleCreditChange}
          error={error}
          errorMessage={errorMessage}
        />
      </div>
      <h1 style={{ color: "#ffffff" }}>RADIO</h1>
      <div className="credit-options-section">
        {creditOptions.map((credit) => (
          <div
            key={credit.value}
            className="credit-options-item clickable-item"
            onClick={() => handleCreditClick(credit.value)}
          >
            <CustomBox>
              <div className="wrapper1">
                <div className="credit-icon">
                  <img src={creditIcon} />
                </div>
                <div
                  className={`credit-value ${
                    selectedCredit === credit.value.toString() ? "active" : ""
                  }`}
                >
                  {credit.value}
                </div>
              </div>
              <RadioButton
                value={credit.value.toString()}
                checked={selectedCredit === credit.value.toString()}
                onChange={setSelectedCredit}
                onClick={(e) => e.stopPropagation()}
              />
            </CustomBox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamplePage;
