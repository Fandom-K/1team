import { useSize } from "../../contexts/SizeContext";
import "./IdolProfile.css";

const IdolProfile = ({
  borderColor = "#f96d69",
  item,
  isSelected, // 선택 여부를 제어하는 값 (선택 됐는지 여부)
  onSelect, // 클릭시 호출할 함수)
}) => {
  const size = useSize();

  const handleClick = () => {
    if (onSelect) {
      onSelect(); // 함수가 넘어온 경우에만 호출
    }
  };

  const style = {
    width: size,
    height: size,
    borderColor,
  };

  return (
    <div
      className="IdolProfile"
      style={{ ...style, cursor: onSelect ? "pointer" : "default" }}
      onClick={onSelect ? handleClick : undefined} // 함수가 있으면 클릭 가능
    >
      <img className="inner-image" src={item.profilePicture} alt="사진" />
      {/* 오버레이 독립 div */}
      {isSelected && <div className="overlay" />}
    </div>
  );
};
export default IdolProfile;
