import "../../styles/modals/ModalDonation.css";
import "../common/Button";
import Modal from "./Modal";
import CreditInput from "../CreditInput";
import { useEffect, useState } from "react";
import idolImage from "/public/idolImage/fandomK-img6.jpg";
import { loadData, saveData } from "../../utils/storage";
import Button from "../common/Button";
import Popup from "./Popup";
import useModal from "../../hooks/useModal";

const ModalDonation = ({ isOpen, onClose }) => {
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
  const result = false;

  // const popupModal = useModal();

  const handleSubmit = () => {
    onClose();
    return result;
  };

  return (
    <Modal title="후원하기" name="ModalDonation" onClose={onClose}>
      <>
        <div className="advertisement" key="modalBody">
          <div className="card">
            <div className="idol-image">
              <img src={idolImage} />
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
          {/* {popupModal.isOpen && (
            <Popup isOpen={popupModal.isOpen} onClose={popupModal.closeModal} />
          )} */}
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
