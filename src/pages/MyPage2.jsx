import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
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

  const handleAddFavorIdolsFromChild = (list) => {
    // 선택된 아이돌 전체 객체 배열이 넘어온다
    const newIdols = list.filter(
      (idol) => !myFavorIdols.some((fav) => fav.id === idol.id)
    );

    setMyFavorIdols((prev) => [...prev, ...newIdols]);
    setSelectedIdols([]); // 선택 초기화
  };

  // 관심삭제
  const handleRemoveFavorite = (idolId) => {
    setMyFavorIdols((prev) => prev.filter((idol) => idol.id !== idolId));
  };

  // 셀렉트
  const toggleSelect = (id) => {
    setSelectedIdols((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    console.log("myFavorIdols 변경됨:", myFavorIdols);
  }, [myFavorIdols]);

  return (
    <div>
      <Header />
      <div>
        <div>
          <h3>내 관심 아이돌</h3>
          <div>
            <FavoriteIdols
              selectedIdolIds={selectedIdols.map((idol) => idol.id)}
              myFavorIdols={myFavorIdols}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </div>
        </div>
        <div>
          <h3>관심있는 아이돌을 추가해보세요</h3>
          {isMobile ? (
            <MyPageMobile
              selectedIdolIds={selectedIdols.map((idol) => idol.id)}
              onToggle={toggleSelect}
            />
          ) : (
            <MyPageDesk
              selectedIdolIds={selectedIdols.map((idol) => idol.id)}
              onToggle={toggleSelect}
            />
          )}
        </div>
        <div>
          <Button
            onClick={() => handleAddFavorIdolsFromChild(selectedIdols || [])}
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
