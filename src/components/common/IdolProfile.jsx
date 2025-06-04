import '../../styles/common/IdolProfile.css';
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
    size = 70, // 기본 사이즈 70px
    borderColor = '#f96d69',
    idol: idol, // api "profilePicture" prop
    isSelected, // 선택 토글용 prop
    onSelect, // 선택 토글용 prop
}) => {
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
            style={{ ...style, cursor: onSelect ? 'pointer' : 'default' }}
            onClick={onSelect ? handleClick : undefined} // 함수가 있으면 클릭 가능
        >
            <img className="inner-image" src={idol.profilePicture} alt={idol.name} />
            {/* 오버레이 독립 div */}
            {isSelected && <div className="overlay" />}
        </div>
    );
};
export default IdolProfile;
