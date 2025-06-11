import "../../styles/modals/Popup.css";
import Modal from "./Modal";
import creditIcon from "../../assets/icons/credit_113px.svg";
import React, { Fragment } from "react";
import Button from "../common/Button";

const Popup = ({
  name = "",
  isOpen,
  onClose,
  imgUrl,
  message,
  highlightKeyword,
}) => {
  return (
    <Modal
      name={`Popup${name}`}
      isOpen={isOpen}
      onClose={onClose}
      width="339px"
    >
      <>
        <div className="popup-content" key="modalBody">
          <div className="popup-image">
            <div className="blur" />
            <img src={creditIcon} />
          </div>
          <span className="popup-message font-medium-16">
            {highlightKeyword
              ? message.split(highlightKeyword).map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {/* 마지막 part가 아니면 하이라이트키워드 span으로 추가 */}
                    {index !== message.split(highlightKeyword).length - 1 && (
                      <span>{highlightKeyword}</span>
                    )}
                  </React.Fragment>
                ))
              : message}
          </span>
        </div>
        <div className="modalFooter" key="modalFooter">
          <Button text="확인" alt="확인" type="positive" onClick={onClose} />
        </div>
      </>
    </Modal>
  );
};

export default Popup;
