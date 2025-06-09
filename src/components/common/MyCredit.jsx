import "../../styles/layout/MyCredit.css";
import { getMyCredit } from "../../utils/getStorage";
import ModalCharge from "../modals/ModalCharge";
import useModal from "../../hooks/useModal";
import { useState } from "react";

const MyCredit = () => {
  const data = getMyCredit();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="mycredit">
      <div className="credit-status">
        <div className="credit-title">
          <p>내 크레딧</p>
        </div>
        <div>
          <div className="credit-now">
            <div className="image-blur">
              <img
                className="credit_image"
                src="../../../src/assets/icons/credit_113px.svg"
              />
              <div className="blur"></div>
            </div>
            <p>{data}</p>
          </div>
        </div>
      </div>
      <div>
        <button className="charge-button" onClick={openModal}>
          충전하기
        </button>
        {isOpen && <ModalCharge onClose={closeModal} />}
      </div>
    </div>
  );
};
export default MyCredit;
