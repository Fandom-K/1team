import { useEffect, useMemo, useState } from "react";
import "../../styles/layout/IdolChartTab.css";
import IdolProfile from "../common/IdolProfile";
import Error from "../../pages/Error";
import Spinner from "../common/Spinner";
import getIdols from "../../services/getIdolss";
import MoreButton from "./MoreButton";
import useIsWideScreen from "../../hooks/useIsWideScreen";

const IdolChartItem = ({ idol, rank }) => {
  return (
    <div className="IdolChartItem">
      <div className="idolchart-item__info">
        <IdolProfile idol={idol} size={70} />
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

  const isWideScreen = useIsWideScreen(745);
  const [visibleCount, setVisibleCount] = useState(null);

  useEffect(() => {
    setLoading(true);

    getIdols({ gender })
      .then((data) => setAllIdols(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [gender]);

  useEffect(() => {
    setVisibleCount(isWideScreen ? 10 : 5);
  }, [isWideScreen]);

  const sortedIdols = useMemo(() => {
    return allIdols
      .filter((idol) => idol.gender === gender)
      .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0));
  }, [allIdols, gender]);

  if (loading || visibleCount === null)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div>
        <Error />
      </div>
    );

  const visibleIdols = sortedIdols.slice(0, visibleCount);

  const handleMoreClick = () => {
    const increment = isWideScreen ? 10 : 5;
    setVisibleCount((prev) => prev + increment);
  };

  const showMoreButton = visibleCount < sortedIdols.length;

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
