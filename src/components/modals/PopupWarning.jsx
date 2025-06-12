import Modal from "./Modal";
import creditIcon from "../../assets/icons/ic_warning.svg";
import React, { Fragment } from "react";
import Button from "../common/Button";

const PopupWarning = ({ isOpen, onClose, message, highlightKeyword }) => {
  return (
    <Modal
      name={"Popup PopupWarning"}
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
          <span
            className="popup-message font-medium-16"
            style={{ whiteSpace: "pre-line" }}
          >
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
          <Button
            text="확인"
            alt="확인"
            type="positive"
            onClick={() => (location.href = "/list")}
          />
        </div>
      </>
    </Modal>
  );
};

export default PopupWarning;
