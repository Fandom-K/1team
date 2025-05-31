import "../../styles/common/Button.css";

const Button = ({ alt, imgsrc, corner, text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Button btn-${corner} btn-${type}`}>
      {imgsrc && <img src={imgsrc} alt={alt} className="btn-img" />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
