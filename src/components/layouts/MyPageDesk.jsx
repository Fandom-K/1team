import { useState, useEffect } from "react";
import axios from "axios";
import ProfileChunk from "../ProfileChunk";
import prevButton from "../../assets/images/prev_btn.png";
import nextButton from "../../assets/images/next_btn.png";

const MyPageDesk = () => {
  const [list, setList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [prevCursors, setPrevCursors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIdols, setSelectedIdols] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    fetchPage(null); // 첫 페이지 로드
  }, []);

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

  const handleNextPage = () => {
    if (nextCursor) {
      fetchPage(nextCursor);
      setPrevCursors((prev) => [...prev, currentCursor]);
      setCurrentCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    const newPrevCursors = [...prevCursors];
    newPrevCursors.pop();
    const prevCursor = newPrevCursors[newPrevCursors.length - 1] || null;
    fetchPage(prevCursor);
    setPrevCursors(newPrevCursors);
    setCurrentCursor(prevCursor);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  // 선택 토글
  const toggleSelect = (idolId) => {
    setSelectedIdols((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
  };

  return (
    <div>
      <button onClick={handlePrevPage} className="list-change-btn">
        <img src={prevButton} alt="이전 페이지" />
      </button>
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
      <button onClick={handleNextPage} className="list-change-btn">
        <img src={nextButton} alt="다음 페이지" />
      </button>
    </div>
  );
};

export default MyPageDesk;
