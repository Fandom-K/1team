import { useState, useContext } from "react";
import "../../styles/layout/IdolChart.css";
import Button from "../common/Button";
import IdolChartTab from "./IdolChartTab";
import VoteContext from "../../contexts/VoteContext";
import chartIcon from "../../assets/icons/chart.svg";

const IdolChart = () => {
  const [activeTab, setActiveTab] = useState("이달의 여자 아이돌");
  const { setVoteGender, voteModal } = useContext(VoteContext);

  const handleButtonClick = () => {
    if (activeTab.includes("여자")) {
      setVoteGender("female");
    } else {
      setVoteGender("male");
    }
    voteModal.openModal();
  };

  return (
    <div className="IdolChart">
      <div className="idolchart-header">
        <h1 className="font-bold-20-line26">이달의 차트</h1>
        <Button
          text="차트  투표하기"
          imgsrc={chartIcon}
          alt="차트 투표하기 버튼"
          type="positive"
          corner="angular"
          className="font-bold-13-line26-letter2"
          onClick={handleButtonClick}
        />
      </div>

      <div className="idolchart-tap">
        <div className="idolchart-buttons font-regular-14">
          <button
            onClick={() => setActiveTab("이달의 여자 아이돌")}
            className={activeTab === "이달의 여자 아이돌" ? "active" : ""}
          >
            이달의 여자 아이돌
          </button>
          <button
            onClick={() => setActiveTab("이달의 남자 아이돌")}
            className={activeTab === "이달의 남자 아이돌" ? "active" : ""}
          >
            이달의 남자 아이돌
          </button>
        </div>

        <div>
          <div
            style={{
              display: activeTab === "이달의 여자 아이돌" ? "block" : "none",
            }}
          >
            <IdolChartTab gender="female" />
          </div>
          <div
            style={{
              display: activeTab === "이달의 남자 아이돌" ? "block" : "none",
            }}
          >
            <IdolChartTab gender="male" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdolChart;
