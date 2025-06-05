import Button from "../common/Button";
import "../../styles/layout/MoreButton.css";

const MoreButton = ({ onClick }) => {
  return (
    <div className="MoreButton font-bold-14-line26">
      <Button
        text="더 보기"
        alt="차트 투표하기 버튼"
        type="more"
        corner="angular"
        onClick={onClick}
      />
    </div>
  );
};

export default MoreButton;
