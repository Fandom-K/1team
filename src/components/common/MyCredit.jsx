import "../../styles/layout/MyCredit.css";
import { getMyCredit } from "../../utils/getStorage";
import ModalCharge from "../modals/ModalCharge";
import creditImg from "../../assets/icons/credit_113px.svg";
import { useContext } from "react";
import ChargeContext from "../../contexts/ChargeContext";

const MyCredit = () => {
  const data = getMyCredit();
  const { chargeModal, setChargeSuccess } = useContext(ChargeContext);

  return (
    <>
      <div className="my-credit">
        <div className="my-credit-status">
          <div className="my-credit-title">
            <p>내 크레딧</p>
          </div>
          <div>
            <div className="my-credit-amount">
              <div className="my-credit-icon-wrapper">
                <img className="my-credit-icon" src={creditImg} />
                <div className="my-credit-blur"></div>
              </div>
              <p>{data}</p>
            </div>
          </div>
        </div>
        <div>
          <button
            className="my-credit-charge-button"
            onClick={chargeModal.openModal}
          >
            충전하기
          </button>
          {chargeModal.isOpen && (
            <ModalCharge
              onClose={(result) => {
                chargeModal.closeModal();
                setChargeSuccess(result);
              }}
            />
          )}
        </div>
      </div>
      <div className="donation-title-wrapper">
        <div className="font-bold-16-line26">후원을 기다리는 조공</div>
      </div>
    </>
  );
};
export default MyCredit;
