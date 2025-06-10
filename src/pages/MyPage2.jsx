import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import MyPageMobile from "../components/layouts/MyPageMobile";
import MyPageDesk from "../components/layouts/MypageDesk";
import Header from "../components/layouts/Header";
import FavoriteIdols from "../components/layouts/FavoriteIdols";
import Button from "../components/common/Button";
import "../styles/layout/MyPage2.css";

const MyPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [myFavorIdols, setMyFavorIdols] = useState([]);
  const [selectedIdols, setSelectedIdols] = useState([]);
  // 관심 등록
  const handleAddFavorIdols = () => {
    const newIdols = myFavorIdols.filter(
      (idol) =>
        selectedIdols.includes(idol.id) &&
        !myFavorIdols.some((fav) => fav.id === idol.id)
    );
    setMyFavorIdols((prev) => [...prev, ...newIdols]);
    setSelectedIdols([]);
  };

  // 관심삭제
  const handleRemoveFavorite = (idolId) => {
    setMyFavorIdols((prev) => prev.filter((idol) => idol.id !== idolId));
  };

  return (
    <div>
      <Header />
      <div>
        <div>
          <h3>내 관심 아이돌</h3>
          <div>
            <FavoriteIdols
              myFavorIdols={myFavorIdols}
              onRemoveFavorite={handleRemoveFavorite}
              onAddFavorIdols={handleAddFavorIdols}
            />
          </div>
        </div>
        <div>
          <h3>관심있는 아이돌을 추가해보세요</h3>
          {isMobile ? <MyPageMobile /> : <MyPageDesk />}
        </div>
        <div>
          <Button
            onClick={handleAddFavorIdols}
            type="positive"
            corner="angular"
            text="+ 추가하기"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
