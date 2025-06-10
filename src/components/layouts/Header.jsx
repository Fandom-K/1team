import { Link } from "react-router-dom";
import "../../styles/common/header.css";
import logo from "../../assets/images/logo.png";
import profileImg from "../../assets/images/unsplash_COgbRUTvL-s.jpg";

// div태그 수정 필요 리팩토링
// 프로필 이미지는 로컬 스토리지에 지정된 파일을 가져올수 있게 리팩토링해보고싶음
const Header = () => {
  return (
    <div className="Header">
      <div></div>
      <Link to="/list">
        <img className="header-logo" src={logo} alt="로고 이미지" />
      </Link>
      <Link to="/mypage">
        <img className="profile-img" src={profileImg} alt="프로필 이미지" />
      </Link>
    </div>
  );
};

export default Header;
