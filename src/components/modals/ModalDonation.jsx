import "../../styles/modals/ModalDonation.css";
import "../common/Button";
import Modal from "./Modal";
import CreditInput from "../CreditInput";
import { useState, useContext, useEffect } from "react";
import { loadData, saveData } from "../../utils/storage";
import Button from "../common/Button";
import { getCreditData } from "../../utils/getStorage";
import DonateContext from "../../contexts/DonateContext";
import { donateToIdol } from "../../services/saveIdolData";

const ModalDonation = ({ onClose }) => {
  const { toDonateIdol } = useContext(DonateContext);

  const donation = toDonateIdol?.donation || {};

  const [creditValue, setCreditValue] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonType, setButtonType] = useState("disabled");
  const [myCredit, setMyCredit] = useState(null);

  useEffect(() => {
    const data = loadData();
    setMyCredit(data.credit.balance);
  }, []);

  const handleCreditChange = (e) => {
    const value = e.target.value;
    setCreditValue(value);

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

  const saveCredit = async (data) => {
    const backupData = JSON.parse(JSON.stringify(data));

    const newHistory = {
      type: "donate",
      amount: creditValue,
      date: new Date().toISOString(),
    };

    const updatedData = {
      ...data,
      history: [...data.history],
    };

    updatedData.history.push(newHistory);
    updatedData.balance =
      Number(updatedData.balance) - Number(newHistory.amount);

    const storageSuccess = saveData({ credit: updatedData });

    return { success: storageSuccess, updatedData, backupData };
  };

  const saveDonate = async () => {
    try {
      await donateToIdol(donation.id, Number(creditValue));
      return { success: true };
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
        return { success: false, error: e.response.data };
      } else {
        console.log("리퀘스트가 실패했습니다.");
        return { success: false, error: "Request failed." };
      }
    }
  };

  const handleSubmit = async () => {
    if (buttonType === "disabled") return;

    const data = getCreditData();

    const creditResult = await saveCredit(data);

    if (creditResult.success != true) {
      window.alert("후원을 실패했습니다.");
      return false;
    }

    const donateSuccess = await saveDonate();

    if (!donateSuccess.success) {
      console.log("작업 실패로 인해 변경을 적용하지 않습니다.");
      saveData({ credit: creditResult.backupData });
      onClose({ success: false, message: "api error" });
      return false;
    } else {
      onClose({ success: true, message: "donate" });
    }
  };

  return (
    <Modal title="후원하기" name="ModalDonation" onClose={onClose}>
      <>
        <div className="advertisement" key="modalBody">
          <div className="card">
            <div className="idol-image">
              <img src={donation.idol.profilePicture} />
            </div>
            <div className="ad-about">
              <div className="ad-place">{donation.subtitle}</div>
              <div className="ad-name">{donation.title}</div>
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
