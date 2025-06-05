import "../common/Button";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import CustomBox from "../common/CustomBox";
import RadioButton from "../common/RadioButton";
import RadioGroup from "../common/RadioGroup";
import Button from "../common/Button";
import { loadData, saveData } from "../../utils/storage";
import "../../styles/modals/ModalVote.css";
import IdolProfile from "../common/IdolProfile";
import getIdol from "../../services/getIdol";
import Spinner from "../common/Spinner";
import Popup from "./Popup";
import { getCreditData, getMyCredit } from "../../utils/getStorage";
import useModal from "../../hooks/useModal";
import { updateIdol } from "../../services/saveIdol";

const IdolChartItem = ({ idol, rank }) => {
  return (
    <div className="InModalVote IdolChartItem">
      <div className="idolchart-item__info">
        <IdolProfile idol={idol} size={70} />
        <p>{rank}</p>
        <div className="group-and-vote">
          <h3 className="name">
            {idol.group} {idol.name}
          </h3>
          <h4 className="vote font-regular-14">
            {idol.totalVotes?.toLocaleString() || "0"}표
          </h4>
        </div>
      </div>
    </div>
  );
};

const ModalVote = ({ gender, onClose }) => {
  const genderName = gender == "male" ? "남자" : "여자";
  const [allIdols, setAllIdols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIdol, setSelectedIdol] = useState("");
  const [hasvoteToday, setHasVoteToday] = useState(true);

  useEffect(() => {
    const data = getCreditData();
    const voted = data.history.some(
      (el) =>
        el.date.split("T")[0] === new Date().toISOString().split("T")[0] &&
        el.type === "vote"
    );
    setHasVoteToday(voted);
  }, []);

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
    if (allIdols.length > 0) {
      setFilteredData(
        allIdols
          .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
          .slice(6)
      );
    }
  }, [allIdols]);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) return;
    setSelectedIdol(filteredData[0].id);
  }, [filteredData]);

  // if (loading) return <p>로딩 중...</p>;
  if (loading) return <Spinner />;
  if (error) return <p>에러 발생: {error.message}</p>;

  const handleChange = (id) => {
    setSelectedIdol(id);
    // const selected = allIdols.find((idol) => idol.id === id);
    // console.log(`선택된 아이돌: ${selected.name}`);
  };

  const saveCredit = async (data) => {
    const backupData = JSON.parse(JSON.stringify(data));

    const newHistory = {
      type: "vote",
      amount: 1000,
      date: new Date().toISOString(),
    };

    data.history.push(newHistory);
    data.balance = Number(data.balance) - Number(newHistory.amount);

    return { success: true, data, backupData };
  };

  const saveVote = async () => {
    const voteCnt = allIdols.find((idol) => idol.id === selectedIdol)[
      "totalVotes"
    ];

    try {
      await updateIdol(selectedIdol, { totalVotes: Number(voteCnt) + 1 });
      return true;
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        console.log("리퀘스트가 실패했습니다.");
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const data = getCreditData();
    const myCredit = data.balance;

    if (myCredit < 1000) {
      onClose({ error: "credit not enough" });
      return false;
    }

    try {
      const creditResult = await saveCredit(data);

      if (!creditResult.success) {
        return false;
      }

      const voteSuccess = await saveVote();

      if (!voteSuccess) {
        console.log("Vote submission failed. Reverting credit changes.");
        await saveData({ credit: creditResult.backupData }); // 저장된 데이터 롤백
        return false;
      }

      await saveData({ credit: creditResult.data }); // 최종 데이터 저장
      return true;
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      return false;
    }
  };

  // const handleSubmit = () => {
  //   if (result) {
  //     window.alert(`성공적으로 투표 되었습니다./n 현재 잔액: ${data.balance}`);
  //   } else {
  //     window.alert({ error });
  //   }

  //   onClose();
  // };

  return (
    <Modal
      title={`이달의 ${genderName} 아이돌`}
      name="ModalVote"
      onClose={onClose}
      width="525px"
    >
      <>
        <div className="vote-chart-list" key="modalBody">
          {filteredData.map((idol, index) =>
            !hasvoteToday ? (
              <RadioGroup key={idol.id} onClick={() => handleChange(idol.id)}>
                <IdolChartItem idol={idol} rank={index + 1} />
                <RadioButton
                  value={idol.id}
                  checked={selectedIdol === idol.id}
                  onChange={setSelectedIdol}
                  onClick={(e) => e.stopPropagation()}
                />
              </RadioGroup>
            ) : (
              <div key={idol.id} className="disabled-radio">
                <IdolChartItem idol={idol} rank={index + 1} />
              </div>
            )
          )}
        </div>
        <div className="credit-charge-section" key="modalFooter">
          <Button
            type={hasvoteToday ? "disabled" : "positive"}
            text={hasvoteToday ? "이미 차트에 투표했어요" : "투표하기"}
            alt="투표하기"
            onClick={hasvoteToday ? null : handleSubmit}
          />
          {!hasvoteToday && (
            <span className="vote-cost-message">
              투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
            </span>
          )}
        </div>
      </>
    </Modal>
  );
};

export default ModalVote;
