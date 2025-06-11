import "../../styles/layout/MyCredit.css";
import { getMyCredit } from "../../utils/getStorage";
import ModalCharge from "../modals/ModalCharge";
import useModal from "../../hooks/useModal";
import creditImg from "../../assets/icons/credit_113px.svg";
const MyCredit = () => {
  const data = getMyCredit();
  const { isOpen, openModal, closeModal } = useModal();

  return (
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
        <button className="my-credit-charge-button" onClick={openModal}>
          충전하기
        </button>
        {isOpen && <ModalCharge onClose={closeModal} />}
      </div>
    </div>
  );
};
export default MyCredit;
