import "../../styles/modals/ModalMobile.css";
import backIcon from "../../assets/icons/icj_arrow_left.png";

const ModalMobile = ({ name = "", title, onClose, children }) => {
  const modalBody = children.props.children?.find(
    (el) => el.key === "modalBody"
  );

  const modalFooter =
    children.props.children?.find((el) => el.key === "modalFooter") || null;

  return (
    <div className={`ModalMobile ${name}`}>
      <div className="modal-mobile-container">
        <section className="modal-mobile-header">
          <button className="modal-mobile-close" onClick={onClose}>
            <img src={backIcon} alt="닫기" />
          </button>
          <div className={"modal-mobile-title"}>{title}</div>
        </section>
        <div className="modal-mobile-body-and-footer">
          <section className="modal-mobile-body">{modalBody}</section>
          <section className="modal-mobile-footer">{modalFooter}</section>
        </div>
      </div>
    </div>
  );
};

export default ModalMobile;
