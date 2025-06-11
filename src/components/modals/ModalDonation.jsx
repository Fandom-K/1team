import "../../styles/modals/ModalDonation.css";
import "../common/Button";
import Modal from "./Modal";
import CreditInput from "../CreditInput";
import { useState, useContext } from "react";
import { loadData, saveData } from "../../utils/storage";
import Button from "../common/Button";
import { getCreditData } from "../../utils/getStorage";
import DonateContext from "../../contexts/DonateContext";

const ModalDonation = ({ onClose }) => {
  const { toDonateIdol } = useContext(DonateContext);

  const [creditValue, setCreditValue] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonType, setButtonType] = useState("disabled");

  const handleCreditChange = (e) => {
    const value = e.target.value;
    setCreditValue(value);

    const data = loadData();
    const myCredit = data.credit.balance;

    if (value && Number.parseInt(value) > myCredit) {
      setError("error");
      setErrorMessage("갖고 있는 크레딧보다 더 많이 후원할 수 없어요");
      setButtonType("disabled");
    } else {
      setError("");
      setErrorMessage("");
      if (value > 0) {
        setButtonType("positive");
      } else {
        setButtonType("disabled");
      }
    }
  };

  const handleSubmit = () => {
    if (buttonType === "disabled") return;

    const data = getCreditData();

    const newHistory = {
      type: "donate",
      amount: creditValue,
      date: new Date().toISOString(),
    };

    data.history.push(newHistory);
    data.balance = Number(data.balance) - Number(newHistory.amount);

    // const result = saveData({ credit: data });
    // if (result) {
    //   window.alert(`성공적으로 후원 되었습니다./n 현재 잔액: ${data.balance}`);
    // } else {
    //   window.alert("실패");
    // }

    onClose();
  };

  return (
    <Modal title="후원하기" name="ModalDonation" onClose={onClose}>
      <>
        <div className="advertisement" key="modalBody">
          <div className="card">
            <div className="idol-image">
              {/* <img src="/public/idolImage/fandomK-img6.jpg" /> */}
              <img src={toDonateIdol.profilePicture} />
            </div>
            <div className="ad-about">
              <div className="ad-place">강남역 광고</div>
              <div className="ad-name">민지 2023 첫 광고</div>
            </div>
          </div>
          <CreditInput
            value={creditValue}
            placeholder={"크레딧 입력"}
            onChange={handleCreditChange}
            error={error}
            errorMessage={errorMessage}
          />
        </div>
        <div className="donation" key="modalFooter">
          <Button
            type={buttonType}
            text="후원하기"
            alt="후원하기"
            onClick={handleSubmit}
          />
        </div>
      </>
    </Modal>
  );
};

export default ModalDonation;
