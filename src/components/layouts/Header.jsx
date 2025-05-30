import { Link } from "react-router-dom";
import "../../styles/common/header.css";

// div태그 수정 필요 리팩토링
// 프로필 이미지는 로컬 스토리지에 지정된 파일을 가져올수 있게 리팩토링해보고싶음
const Header = () => {
  return (
    <div className="Header">
      <div></div>
      <Link to="/list">
        <img
          className="header-logo"
          src="/src/assets/images/logo.png"
          alt="로고 이미지"
        />
      </Link>
      <Link to="/mypage">
        <img
          className="profile-img"
          src="/src/assets/images/unsplash_COgbRUTvL-s.jpg"
          alt="프로필 이미지"
        />
      </Link>
    </div>
  );
};

export default Header;
