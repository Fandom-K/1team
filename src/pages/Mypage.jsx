import { useState, useEffect } from "react";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import ProfileChunk from "../components/ProfileChunk";
import IdolProfile from "../components/common/IdolProfile";
import idolDeleteBtn from "../assets/icons/btn_delete.svg";
import prevButton from "../assets/images/prev_btn.png";
import nextButton from "../assets/images/next_btn.png";
import axios from "axios";
import "../styles/common/Mypage.css";

const ITEMS_PER_PAGE = 16;

const MypageTest = () => {
  const [list, setList] = useState([]); // 현재 페이지 데이터
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [prevCursors, setPrevCursors] = useState([]); // 이전 커서 스택

  // 관심 아이돌, 선택 아이돌 상태
  const [selectedIdols, setSelectedIdols] = useState([]);
  const [myFavorIdols, setMyFavorIdols] = useState([]);

  // 서버 호출, 커서 요청
  const fetchNextPage = async () => {
    if (loading || (!nextCursor && prevCursors.length > 0)) return; // 처음엔 null 가능
    setLoading(true);

    // 이전 커서 저장: 현재 커서가 있으면 스택에 저장
    if (nextCursor !== null) {
      setPrevCursors((prev) => [...prev, nextCursor]);
    }

    try {
      const res = await axios.get(
        "https://fandom-k-api.vercel.app/16-1/idols",
        {
          params: {
            cursor: nextCursor,
            pageSize: ITEMS_PER_PAGE,
          },
        }
      );

      setList(res.data.list);

      // nextCursor 업데이트
      if (res.data.nextCursor && res.data.nextCursor !== "0") {
        setNextCursor(res.data.nextCursor);
      } else {
        setNextCursor(null);
        setHasMore(false);
      }
    } catch (err) {
      console.error("다음 페이지 요청 실패", err);
    }
    setLoading(false);
  };

  // 이전 페이지 요청 함수
  const handlePrevPage = async () => {
    if (loading || prevCursors.length === 0) return; // 더 이상 이전 없음

    // 이전 커서 꺼내기
    const newPrevCursors = [...prevCursors]; // 복사
    const prevCursor = newPrevCursors.pop(); // 배열 마지막 커서 꺼내기

    console.log("이전 커서:", prevCursor);

    setPrevCursors(newPrevCursors);
    setLoading(true);

    try {
      const res = await axios.get(
        "https://fandom-k-api.vercel.app/16-1/idols",
        {
          params: {
            cursor: prevCursor,
            pageSize: ITEMS_PER_PAGE,
          },
        }
      );
      setList(res.data.list);
      // nextCursor 업데이트
      if (res.data.nextCursor && res.data.nextCursor !== "0") {
        setNextCursor(res.data.nextCursor);
      } else {
        setNextCursor(null);
        setHasMore(false);
      }
    } catch (err) {
      console.error("이전 페이지 요청 실패", err);
    }
    setLoading(false);
  };

  // 최초 요청 또는 페이지 변경
  useEffect(() => {
    // 최초 로드시, 처음에는 null로 요청 (첫 페이지)
    fetchNextPage();
  }, []);

  // 관심등록
  const handleAddFavorIdols = () => {
    const newIdols = list.filter(
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

  // 선택 토글
  const toggleSelect = (idolId) => {
    setSelectedIdols((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
  };

  const handleNextPage = () => {
    fetchNextPage();
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
              <button
                className="list-change-btn"
                onClick={handlePrevPage}
                disabled={loading || prevCursors.length === 0}
              >
                <img src={prevButton} />
              </button>
            </div>
            <div className="interest-idols-list">
              {list.map((idol, index) => (
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
              <button
                className="list-change-btn"
                onClick={handleNextPage}
                disabled={!hasMore}
              >
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

export default MypageTest;
