import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import getIdols from "../services/getIdols";
import usePageSize from "../hooks/usePageSize";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import ProfileChunk from "../components/ProfileChunk";
import IdolProfile from "../components/common/IdolProfile";
import Spinner from "../components/common/Spinner";
import idolDeleteBtn from "../assets/icons/btn_delete.svg";
import prevButton from "../assets/images/prev_btn.png";
import nextButton from "../assets/images/next_btn.png";
import axios from "axios";
import Error from "../pages/Error";
import "../styles/common/Mypage.css";

const INITIAL_ITEMS = 16;

const MypageTest = () => {
  const pageSize = usePageSize(16, 8, 6);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // 전체 데이터 저장소 (모바일용)
  const [allIdols, setAllIdols] = useState([]);
  const [groupedIdols, setGroupedIdols] = useState([]);

  // 페이징 정보 (데스크탑용)
  const [list, setList] = useState([]); // 현재 페이지 데이터
  const [nextCursor, setNextCursor] = useState(null);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [prevCursors, setPrevCursors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 관심 툴(아이돌)
  const [myFavorIdols, setMyFavorIdols] = useState([]);
  const [selectedIdols, setSelectedIdols] = useState([]);

  // 모바일에서 전체 아이돌 데이터 요청
  const fetchAllIdols = async () => {
    try {
      setLoading(true);
      const data = await getIdols();
      setAllIdols(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 페이지별 데이터 요청 (데스크탑)
  const fetchPage = async (cursor) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://fandom-k-api.vercel.app/16-1/idols",
        {
          params: { cursor, pageSize },
        }
      );
      const data = response.data;
      setList(data.list);
      setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 최초 로드 시 또는 페이지 사이즈 변경 시 호출
  useEffect(() => {
    if (isMobile) {
      fetchAllIdols(); // 모바일은 전체 요청
    } else {
      fetchPage(null); // 데스크탑은 페이징 요청
    }
    // 페이지 크기 변경 시에는 기존 페이지 상태 유지
  }, [isMobile, pageSize]);

  // 모바일용으로 전체 아이돌 데이터 가공
  useEffect(() => {
    if (isMobile && allIdols.length > 0) {
      const chunks = chunkArray(allIdols, 9); // 모바일은 9개씩 묶기
      setGroupedIdols(chunks);
    }
  }, [allIdols, isMobile]);

  // 이전/다음 페이지 핸들러
  const handleNextPage = () => {
    if (!isMobile && nextCursor) {
      fetchPage(nextCursor);
      setPrevCursors((prev) => [...prev, currentCursor]);
      setCurrentCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    const newPrevCursors = [...prevCursors];
    newPrevCursors.pop(); // 마지막으로 저장한 커서 삭제
    const prevCursor = newPrevCursors[newPrevCursors.length - 1] || null;
    fetchPage(prevCursor);
    setPrevCursors(newPrevCursors);
    setCurrentCursor(prevCursor);
  };

  // 관심 등록
  const handleAddFavorIdols = () => {
    const sourceIdols = isMobile ? allIdols : list;
    const newIdols = sourceIdols.filter(
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

  // 스와이퍼용 3*3 배열 함수
  const chunkArray = (arr, size) => {
    if (!arr || arr.length === 0) return [];
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // 기본 로딩 처리
  if (loading) {
    return (
      <p>
        <Spinner />
      </p>
    );
  }

  return (
    <div>
      {!error ? (
        <div className="MyPage">
          <Header />

          <div>
            {/* 내가 관심있는 아이돌 목록 */}
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
                      <img src={idolDeleteBtn} alt="삭제 버튼" />
                    </button>
                    <div className="idol-info">
                      <h4>{idol.name}</h4>
                      <p>{idol.group}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 관심 있는 아이돌 표시 영역 */}
            <div className="interest-idols">
              <h3 className="font-bold-16-line26">
                관심 있는 아이돌을 추가해보세요.
              </h3>
              {isMobile ? (
                // 모바일: 스와이퍼
                <Swiper slidesPerView={1} spaceBetween={20}>
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
                // 데스크탑: 페이지네이션
                <div className="interest-idols-list-md-to-large">
                  <div>
                    <button
                      className="list-change-btn"
                      onClick={handlePrevPage}
                    >
                      <img src={prevButton} alt="이전 페이지" />
                    </button>
                  </div>
                  <div className="interest-idols-list">
                    {list.map((idol) => (
                      <ProfileChunk
                        key={idol.id}
                        className="ProfileChunk"
                        idol={idol}
                        isSelected={selectedIdols.includes(idol.id)}
                        onClick={() => toggleSelect(idol.id)}
                      />
                    ))}
                  </div>
                  <button className="list-change-btn" onClick={handleNextPage}>
                    <img src={nextButton} alt="다음 페이지" />
                  </button>
                </div>
              )}
            </div>

            {/* 내 관심 아이돌에 추가 버튼 */}
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
      ) : (
        <Error />
      )}
    </div>
  );
};

export default MypageTest;
