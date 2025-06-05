import "../styles/ExamplePage.css";
import Input from "/src/components/common/Input.jsx";
import CreditInput from "/src/components/CreditInput.jsx";
import { useState, useEffect } from "react";
import RadioButton from "../components/common/RadioButton";
import CustomBox from "../components/common/CustomBox";
import creditIcon from "/src/assets/icons/credit_icon.png";
import ModalCharge from "../components/modals/ModalCharge";
import Button from "../components/common/Button";
import useModal from "../hooks/useModal";
import ModalDonation from "../components/modals/ModalDonation";
import { loadData } from "../utils/storage";
import Popup from "../components/modals/Popup";
import ModalVote from "../components/modals/ModalVote";
import RadioGroup from "../components/common/RadioGroup";

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

    const data = loadData();
    const myCredit = data.credit.balance;

    if (value && Number.parseInt(value) > Number(myCredit)) {
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

  /*
   * modal
   */
  const creditModal = useModal();
  const donateModal = useModal();
  const voteModal = useModal();
  const voted = false;
  const gender = "female";
  const [voteSuccess, setVoteSuccess] = useState(null);
  const votePopupModal = useModal();

  useEffect(() => {
    //level-up: 크레딧 부족이 아닌, 로컬스토리지 저장 성공, 실패에도 팝업 오픈하기
    if (voteSuccess && voteSuccess.error) {
      votePopupModal.openModal();
    }
  }, [voteSuccess]);

  return (
    <div className="ExamplePage">
      <div className="custom-modal">
        <h1 style={{ color: "#ffffff" }}>모달</h1>
        <Button
          type="positive"
          text="충전하기 모달 오픈"
          className="open-modal-charge"
          onClick={creditModal.openModal}
        />
        <Button
          type="disabled"
          text="후원하기 모달 오픈"
          className="open-modal-donation"
          onClick={donateModal.openModal}
        />
        <Button
          type="positive"
          text="투표하기 모달 오픈"
          className="open-modal-vote"
          onClick={voteModal.openModal}
        />
      </div>
      {creditModal.isOpen && (
        <ModalCharge
          isOpen={creditModal.isOpen}
          onClose={creditModal.closeModal}
        />
      )}
      {donateModal.isOpen && (
        <ModalDonation
          isOpen={donateModal.isOpen}
          onClose={donateModal.closeModal}
          // onClose={(result) => {
          //   donateModal.closeModal();
          //   setVoteSuccess(result);
          // }}
        />
      )}
      {voteModal.isOpen && (
        <ModalVote
          gender={gender}
          voted={voted}
          isOpen={voteModal.isOpen}
          onClose={(result) => {
            voteModal.closeModal();
            setVoteSuccess(result);
          }}
        />
      )}
      {votePopupModal.isOpen && (
        <Popup
          isOpen={votePopupModal.isOpen}
          onClose={votePopupModal.closeModal}
        />
      )}
      <div className="custom-input">
        <h1 style={{ color: "#ffffff" }}>INPUT</h1>
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
      <div className="custom-radio">
        <h1 style={{ color: "#ffffff" }}>RADIO</h1>
        <div className="credit-options-section">
          {creditOptions.map((credit) => (
            <RadioGroup
              key={credit.value}
              onClick={() => handleCreditClick(credit.value)}
            >
              <CustomBox>
                <div className="wrapper1 font-bold-20-line26">
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
            </RadioGroup>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
