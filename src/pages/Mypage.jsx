import { useState } from "react";
import InterestIdolList from "../components/InterestIdolList";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import "../styles/common/Mypage.css";
import ProfileChunk from "../components/ProfileChunk";
import useAllIdolList from "../hooks/useAllIdolList";

const MyPage = () => {
  const { allIdols, loading, error } = useAllIdolList(20);
  const [selectedIds, setSelectedIds] = useState([]);

  if (loading) return <div>Loading...</div>; // 로딩중일 때 보여줄 화면
  if (error) return <div>Error: {error.message}</div>; // 오류 발생 시

  // 선택된 아이돌 id 배열

  const toggleSelect = (idolId) => {
    // 선택 해제 또는 선택
    setSelectedIds((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
  };

  return (
    <div className="MyPage">
      <Header />
      <div>
        <div className="my-idols">
          <h3 className="font-bold-16-line26">내가 관심있는 아이돌</h3>
          <div className="my-idols-list"></div>
        </div>
        <div className="interest-idols">
          <h3 className="font-bold-16-line26">
            관심 있는 아이돌을 추가해보세요.
          </h3>
          <div className="interest-idols-list">
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
          <Button className="mypage-btn" text="+ 추가하기" type="positive" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
