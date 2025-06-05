import "../../styles/layout/IdolChartTab.css";
import Button from "../common/Button";
import useAllIdolList from "../../hooks/useAllIdolList";
import IdolProfile from "../common/IdolProfile";

// api 가져오면 프롭스로 받은 조건을 적용해서 렌더링
const IdolChartItem = ({ idol, rank }) => {
  return (
    <div className="IdolChartItem">
      <div className="idolchart-item__info">
        <IdolProfile size={70} />
        <p>{rank}</p>
        <h3>
          {idol.group} {idol.name}
        </h3>
      </div>
      <h4>{idol.totalVotes?.toLocaleString() || "0"}표</h4>
    </div>
  );
};

const IdolChartTab = ({ gender = "female" }) => {
  const { allIdols, loading, error } = useAllIdolList();

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  // 성별 필터링 + 상위 5명 정렬 (votes 기준 정렬이 있다고 가정)
  const filtered = allIdols
    .filter((idol) => idol.gender === gender)
    .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
    .slice(0, 5); // 상위 5명만

  return (
    <div className="IdolChartTab">
      {filtered.map((idol, index) => (
        <IdolChartItem key={idol.id} idol={idol} rank={index + 1} />
      ))}
      <Button
        text="더 보기"
        alt="차트 투표하기 버튼"
        type="more"
        corner="angular"
      />
    </div>
  );
};

export default IdolChartTab;
