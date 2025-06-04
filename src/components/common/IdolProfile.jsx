import "../../styles/common/IdolProfile.css";
import icCheck from "../../assets/icons/ic_check.png";
/**
 * 아이돌 프로필 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 속성들
 * @param {number} props.size - 프로필 사진의 크기 (픽셀 단위)
 * @param {string} props.borderColor - 테두리 색상
 * @param {Object} props.item - 아이돌 데이터 객체 (프로필 사진 등 포함)
 * @param {boolean} props.isSelected - 선택 상태
 * @param {function} props.onSelect - 선택 시 호출되는 콜백 함수
 */
const IdolProfile = ({
  size,
  borderColor = "var(--brand-100)",
  idol, // api "profilePicture" prop
  isSelected,
  onClick,
}) => {
  const style = {
    width: size + "px",
    height: size + "px",
    borderColor,
  };

  return (
    <div className="IdolProfile" style={{ ...style }}>
      {idol && idol.profilePicture ? (
        <img
          className="inner-image"
          src={idol.profilePicture}
          alt={idol.name}
          onClick={onClick}
        />
      ) : (
        <div>로딩 중...</div>
      )}

      {isSelected && (
        <>
          <div className="selected-color" />
          <img
            className="selected"
            src={icCheck} // 체크 표시에 사용할 이미지 경로
            alt="선택됨"
          />
        </>
      )}
    </div>
  );
};
export default IdolProfile;
