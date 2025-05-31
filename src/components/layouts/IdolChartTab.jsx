import "../../styles/layout/IdolChartTab.css";
import Button from "../common/Button";

// api 가져오면 프롭스로 받은 조건을 적용해서 렌더링
const IdolChartItem = ({ gender = "female" }) => {
  return (
    <div className="IdolChartItem">
      <div className="idolchart-item__info">
        <img src="../../../public/IdolImage/fandomK-img-1.jpg" />
        <p>1</p>
        <h3>르세라핌 채원</h3>
      </div>

      <h4>104,000표</h4>
    </div>
  );
};

const IdolChartTab = ({ gender = "female" }) => {
  return (
    <div className="IdolChartTab">
      <IdolChartItem gender={gender} />
      <IdolChartItem gender={gender} />
      <IdolChartItem gender={gender} />
      <IdolChartItem gender={gender} />
      <IdolChartItem gender={gender} />
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
