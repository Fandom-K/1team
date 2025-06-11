import "../common/Button";
import Modal from "./Modal";
import creditIcon from "/src/assets/icons/credit_icon.png";
import { useState } from "react";
import CustomBox from "../common/CustomBox";
import RadioButton from "../common/RadioButton";
import RadioGroup from "../common/RadioGroup";
import Button from "../common/Button";
import { saveData } from "../../utils/storage";
import "../../styles/modals/ModalCharge.css";
import { getCreditData } from "../../utils/getStorage";

const ModalCharge = ({ onClose }) => {
  const [selectedCredit, setSelectedCredit] = useState("100");

  const creditOptions = [
    { value: "100", label: "100" },
    { value: "500", label: "500" },
    { value: "1000", label: "1000" },
  ];

  const handleCreditClick = (point) => {
    setSelectedCredit(point.toString());
  };

  const handleSubmit = () => {
    const data = getCreditData();

    const newHistory = {
      type: "charge",
      amount: selectedCredit,
      date: new Date().toISOString(),
    };

    data.history.push(newHistory);
    data.balance = Number(data.balance) + Number(newHistory.amount);

    const result = saveData({ credit: data });
    if (result) {
      window.alert(`성공적으로 충전 되었습니다./n 현재 잔액: ${data.balance}`);
    } else {
      window.alert("실패");
    }

    onClose();
  };

  return (
    <Modal title="크레딧 충전하기" name="ModalCharge" onClose={onClose}>
      <>
        <div className="credit-options-section" key="modalBody">
          {creditOptions.map((credit) => (
            <RadioGroup
              key={credit.value}
              onClick={() => handleCreditClick(credit.value)}
            >
              <CustomBox width="100%">
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
        <div className="credit-charge-section" key="modalFooter">
          <Button
            type="positive"
            text="충전하기"
            alt="충전하기"
            imgsrc="/src/assets/icons/credit_white.png"
            onClick={handleSubmit}
          />
        </div>
      </>
    </Modal>
  );
};

export default ModalCharge;
