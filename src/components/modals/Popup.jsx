import "../../styles/modals/Popup.css";
import Modal from "./Modal";
import creditIcon from "../../assets/icons/credit_113px.svg";
import { useEffect } from "react";
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
            앗! 투표하기 위한 <span>크레딧</span>이 부족해요
          </span>
        </div>
        <div className="modalFooter" key="modalFooter">
          <Button text="확인" alt="확인" type="positive" onClick={onClose} />
        </div>
      </>
      {/* <div className="popup-content" key="modalBody">
        <div className="popup-image">
          <img src={imgUrl} />
        </div>
        <div className="popup-message">
          {highlightKeyword
            ? message.split(highlightKeyword).map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  마지막 part가 아니면 하이라이트키워드 span으로 추가
                  {index !== message.split(highlightKeyword).length - 1 && (
                    <span>{highlightKeyword}</span>
                  )}
                </React.Fragment>
              ))
            : message}
        </div>
      </div> */}
    </Modal>
  );
};

export default Popup;
