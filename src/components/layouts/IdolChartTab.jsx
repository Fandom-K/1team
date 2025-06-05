import { useEffect, useState } from "react";
import "../../styles/layout/IdolChartTab.css";

import IdolProfile from "../common/IdolProfile";
import getIdol from "../../services/getIdol";
import MoreButton from "./MoreButton";

const IdolChartItem = ({ idol, rank }) => {
  return (
    <div className="IdolChartItem">
      <div className="idolchart-item__info">
        <IdolProfile idol={idol} size={80} />
        <p className="font-regular-16">{rank}</p>
        <h3 className="font-medium-16">
          {idol.group} {idol.name}
        </h3>
      </div>
      <h4 className="font-regular-14">
        {idol.totalVotes?.toLocaleString() || "0"}표
      </h4>
    </div>
  );
};

const IdolChartTab = ({ gender = "female" }) => {
  const [allIdols, setAllIdols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleCount, setVisibleCount] = useState(() =>
    window.innerWidth >= 745 ? 10 : 5
  );

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 745);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getIdol({ gender });
        setAllIdols(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [gender]);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 745);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  const filtered = allIdols
    .filter((idol) => idol.gender === gender)
    .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0));

  const visibleIdols = filtered.slice(0, visibleCount);

  const handleMoreClick = () => {
    const increment = isWideScreen ? 10 : 5;
    setVisibleCount((prev) => prev + increment);
  };

  const showMoreButton = visibleCount < filtered.length;

  return (
    <>
      <div className="IdolChartTab grid-column">
        {visibleIdols.map((idol, index) => (
          <IdolChartItem key={idol.id} idol={idol} rank={index + 1} />
        ))}
      </div>

      {showMoreButton && (
        <div className="IdolChartTab__button-wrapper">
          <MoreButton onClick={handleMoreClick} />
        </div>
      )}
    </>
  );
};

export default IdolChartTab;
