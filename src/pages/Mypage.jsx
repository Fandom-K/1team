import { useState } from "react";
import FavorIdolList from "../components/FavorIdolList";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import "../styles/common/Mypage.css";
import ProfileChunk from "../components/ProfileChunk";
import useAllIdolList from "../hooks/useAllIdolList";

const MyPage = () => {
  const { allIdols, loading, error } = useAllIdolList(20);
  const [selectedIds, setSelectedIdols] = useState([]);
  const [myFavorIdols, setMyFavorIdols] = useState([]);

  if (loading) return <div>Loading...</div>; // 로딩중일 때 보여줄 화면
  if (error) return <div>Error: {error.message}</div>; // 오류 발생 시

  const toggleSelect = (idolId) => {
    setSelectedIdols((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
  }; // 선택 토글 함수

  // const newSelectedIdols = allIdols.filter((idol) =>
  //   selectedIds.includes(idol.id)
  // );
  const handleAddFavorIdols = () => {
    const newSelectedIdols = allIdols.filter((idol) =>
      selectedIds.includes(idol.id)
    );
    const newIdols = newSelectedIdols.filter(
      (idol) => !myFavorIdols.some((existing) => existing.id === idol.id)
    );
    //이미 있는 목록 제외 new 선언
    setMyFavorIdols((prev) => {
      const updated = [...prev, newIdols];
      return updated;
    }); // 관심목록에 set 된 좋아하는 아이돌 병합?

    setSelectedIdols([]);
  };

  return (
    <div className="MyPage">
      <Header />
      <div>
        <div className="my-idols">
          <h3 className="font-bold-16-line26">내가 관심있는 아이돌</h3>
          <div className="my-idols-list">
            {myFavorIdols.length === 0 && <p>관심 아이돌이 없습니다.</p>}
            {myFavorIdols.map((idol) => (
              <div key={idol.id} className="Favor-idol-item">
                <IdolProfile idol={idol} />
                <div>
                  <h4>{idol.name}</h4>
                  <p>{idol.group}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="Favor-idols">
          <h3 className="font-bold-16-line26">
            관심 있는 아이돌을 추가해보세요.
          </h3>
          <div className="Favor-idols-list">
            {allIdols.map((idol, index) => (
              <ProfileChunk
                key={idol.id}
                className="ProfileChunk"
                index={index}
                idol={idol}
                isSelected={selectedIds.includes(idol.id)} // 선택여부 props 전달
                onClick={() => toggleSelect(idol.id)} // 클릭 시 선택 토글
              />
            ))}
          </div>
        </div>

        <div className="button-wrapper">
          <Button
            onClick={handleAddFavorIdols}
            className="mypage-btn"
            text="+ 추가하기"
            type="positive"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
