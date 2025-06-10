import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import getIdol from "../services/getIdol";
import usePageSize from "../hooks/usePageSize";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import ProfileChunk from "../components/ProfileChunk";
import IdolProfile from "../components/common/IdolProfile";
import idolDeleteBtn from "../assets/icons/btn_delete.svg";
import prevButton from "../assets/images/prev_btn.png";
import nextButton from "../assets/images/next_btn.png";
import axios from "axios";
import "../styles/common/Mypage.css";

const INITIAL_ITEMS = 16;

const Mypage = () => {
  const ITEMS_PER_PAGE = usePageSize(16, 8, 6);
  const pageSize = usePageSize(16, 8, 6);
  const [list, setList] = useState([]); // 현재 페이지 데이터
  const [nextCursor, setNextCursor] = useState(null);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [prevCursors, setPrevCursors] = useState([]); // 이전 커서 스택

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Idols, setIdols] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  const groupedIdols = isMobile ? chunkArray(Idols, 9) : [];

  // 관심 아이돌, 선택 아이돌 상태
  const [selectedIdols, setSelectedIdols] = useState([]);
  const [myFavorIdols, setMyFavorIdols] = useState([]);

  const fetchPage = async (cursor, isInitial = false) => {
    const pageSizeToUse = isInitial ? INITIAL_ITEMS : ITEMS_PER_PAGE;

    // 이전 커서 저장
    if (cursor !== null) {
      setPrevCursors((prev) => [...prev, cursor]);
    } // 현재 위치를 다음 요청에 활용하기 위해 저장

    const response = await axios.get(
      "https://fandom-k-api.vercel.app/16-1/idols",
      {
        params: { cursor, pageSize: pageSizeToUse },
      }
    );
    const data = response.data;

    setCurrentCursor(cursor); // 현재 위치
    setList(data.list);
    // 만약 응답에 nextCursor 있으면, 다음 요청에 사용
    setNextCursor(data.nextCursor);
  };

  // 다음 페이지 호출
  const handleNextPage = () => {
    fetchPage(nextCursor);
  };

  // 이전 페이지 호출
  const handlePrevPage = () => {
    // 이전 커서 중 가장 마지막 것 꺼내기
    const prevStack = [...prevCursors];
    prevStack.pop(); // 마지막 커서 제거 (현재 위치)
    const prevCursor = prevStack[prevStack.length - 1]; // 바로 이전 커서

    // 이전 커서로 요청
    fetchPage(prevCursor);
    setPrevCursors(prevStack); // 저장된 이전 커서 업데이트
  };

  useEffect(() => {
    fetchPage();
  }, []);

  useEffect(() => {
    fetchPage(null);
  }, [pageSize]);

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

  //데이터 요청
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getIdol();
        setIdols(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

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
                <div className="idol-info">
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
          {isMobile ? (
            // 모바일이면 Swiper 적용
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              // 필요에 따라 navigation, pagination 추가 가능
            >
              {groupedIdols.map((group, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 2fr)",
                      gap: "10px",
                    }}
                  >
                    {group.map((idol) => (
                      <ProfileChunk
                        key={idol.id}
                        className="ProfileChunk"
                        idol={idol}
                        isSelected={selectedIdols.includes(idol.id)}
                        onClick={() => toggleSelect(idol.id)}
                      />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div>
              <div>
                <button
                  className="list-change-btn"
                  onClick={() => handlePrevPage()}
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
                  onClick={() => handleNextPage()}
                >
                  <img src={nextButton} />
                </button>
              </div>
            </div>
          )}
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

export default Mypage;
