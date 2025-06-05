import { useState, useEffect } from "react";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import ProfileChunk from "../components/ProfileChunk";
import useAllIdolList from "../hooks/useAllIdolList";
import IdolProfile from "../components/common/IdolProfile";
import idolDeleteBtn from "../assets/icons/btn_delete.svg";
import prevButton from "../assets/images/prev_btn.png";
import nextButton from "../assets/images/next_btn.png";

import "../styles/common/Mypage.css";

const MyPage = () => {
  const { allIdols, loading, error } = useAllIdolList(16);
  const [selectedIdols, setSelectedIdols] = useState([]);
  const [myFavorIdols, setMyFavorIdols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //페이지네이션 상태저장

  useEffect(() => {
    console.log("현재 페이지 변경됨:", currentPage);
  }, [currentPage]);

  if (loading) return <div>Loading...</div>; // 로딩중일 때 보여줄 화면
  if (error) return <div>Error: {error.message}</div>; // 오류 발생 시

  const toggleSelect = (idolId) => {
    setSelectedIdols((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
    console.log("현재 선택된 아이돌 ID들:", selectedIdols);
  }; // 선택 토글 함수

  const handleAddFavorIdols = () => {
    const newSelectedIdols = allIdols.filter((idol) =>
      selectedIdols.includes(idol.id)
    );
    const newIdols = newSelectedIdols.filter(
      (idol) => !myFavorIdols.some((existing) => existing.id === idol.id)
    ); //이미 있는 목록 제외 new 선언

    console.log(newIdols);

    setMyFavorIdols((prev) => {
      const updated = [...prev, ...newIdols];
      console.log("업데이트된 관심 아이돌:", updated); // 중간값 디버깅
      return updated;
    }); // 관심목록에 set 된 좋아하는 아이돌 병합?

    setSelectedIdols([]);
  };

  const handleRemoveFavorite = (idolId) => {
    setMyFavorIdols((prev) => prev.filter((idol) => idol.id !== idolId));
    console.log("삭제:", idolId);
  };

  //------아래는 페이지네이션 함수'3')/-------//

  const itemsPerPage = 16;

  const totalPages = Math.ceil(allIdols.length / itemsPerPage);

  // const currenIdols = allIdols.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );//현재 페이지 아이돌 목록

  const handlePrevPage = () => {
    if (currentPage > 1)
      setCurrentPage((prev) => {
        console.log("prev page before update:", prev);
        return prev - 1;
      }); //test
    console.log("prev");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    console.log("next");
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
              <div className="chunk-wrapper" key={idol.id}>
                <IdolProfile idol={idol} />
                <button
                  className="idol-delete-Btn"
                  onClick={() => handleRemoveFavorite(idol.id)}
                >
                  <img src={idolDeleteBtn} />
                </button>
                <div>
                  <h4>{idol.name}</h4>
                  <p>{idol.group}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="interest-idols">
          <h3 className="font-bold-16-line26">
            관심 있는 아이돌을 추가해보세요.
          </h3>
          <div>
            <div>
              <button className="list-change-btn" onClick={handlePrevPage}>
                <img src={prevButton} />
              </button>
            </div>
            <div className="interest-idols-list">
              {allIdols
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((idol, index) => (
                  <ProfileChunk
                    key={idol.id}
                    className="ProfileChunk"
                    index={index}
                    idol={idol}
                    isSelected={selectedIdols.includes(idol.id)} //클릭시 오버레이
                    onClick={() => toggleSelect(idol.id)} // 클릭시 선택 토글
                  />
                ))}
            </div>
            <div>
              <button className="list-change-btn" onClick={handleNextPage}>
                <img src={nextButton} />
              </button>
            </div>
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
