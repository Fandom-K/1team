import "../../styles/modals/Modal.css";
import closeIcon from "../../assets/icons/btn_delete_24px.png";

const Modal = ({ name = "", title, onClose, children, width }) => {
  const modalBody = children.props.children?.find(
    (el) => el.key === "modalBody"
  );

  const modalFooter =
    children.props.children?.find((el) => el.key === "modalFooter") || null;

  return (
    <div className={`modal-overay`}>
      <div className={`Modal ${name}`} style={{ width: `${width}` || "327px" }}>
        <div className="modal-container">
          <section className="modal-header">
            <div
              className={`modal-title ${
                name !== "ModalVote" ? "font-semibold-18" : ""
              }`}
            >
              {title}
            </div>
            <button className="modal-close" onClick={onClose}>
              <img src={closeIcon} alt="닫기" />
            </button>
          </section>
          <div className="modal-body-and-footer">
            <section className="modal-body">{modalBody}</section>
            <section className="modal-footer">{modalFooter}</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
