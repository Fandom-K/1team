import "../common/Button";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import RadioButton from "../common/RadioButton";
import RadioGroup from "../common/RadioGroup";
import Button from "../common/Button";
import { saveData } from "../../utils/storage";
import "../../styles/modals/ModalVote.css";
import getIdol from "../../services/getIdol";
import Spinner from "../common/Spinner";
import { getCreditData } from "../../utils/getStorage";
import { addVote } from "../../services/saveIdolData";
import ModalMobile from "./ModalMobile";
import GradientVote from "../../pages/GradientVote";

const IdolChartItem = ({ idol, rank, selected }) => {
  return (
    <div className="InModalVote IdolChartItem">
      <div className="idolchart-item__info">
        <GradientVote idol={idol} isSelected={selected} />
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

const ModalVote = ({ isMobile, gender, onClose }) => {
  const genderName = gender == "male" ? "남자" : "여자";
  const [allIdols, setAllIdols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIdolId, setSelectedIdolId] = useState("");
  const [hasvoteToday, setHasVoteToday] = useState(null);

  useEffect(() => {
    const data = getCreditData();
    const voted = data.history.some(
      (el) =>
        el.date.split("T")[0] === new Date().toISOString().split("T")[0] &&
        el.type === "vote-" + gender
    );
    setHasVoteToday(voted);
  }, [hasvoteToday]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getIdol();
        setAllIdols(data.filter((idol) => idol.gender === gender));
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
        allIdols.sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
      );
    }
  }, [allIdols]);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) return;
    setSelectedIdolId(filteredData[0].id);
  }, [filteredData]);

  // if (loading) return <p>로딩 중...</p>;
  if (loading) return <Spinner />;
  if (error) return <p>에러 발생: {error.message}</p>;

  const handleChange = (id) => {
    setSelectedIdolId(id);
    // const selected = allIdols.find((idol) => idol.id === id);
    // console.log(`선택된 아이돌: ${selected.name}`);
  };

  const saveCredit = async (data) => {
    const backupData = JSON.parse(JSON.stringify(data));

    const newHistory = {
      type: "vote-" + gender,
      amount: 1000,
      date: new Date().toISOString(),
    };

    const updatedData = { ...data };
    updatedData.history.push(newHistory);
    updatedData.balance =
      Number(updatedData.balance) - Number(newHistory.amount);

    return { success: true, updatedData, backupData };
  };

  const saveVote = async () => {
    try {
      await addVote(selectedIdolId);
      return { success: true };
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
        return { success: false, error: e.response.data };
      } else {
        console.log("리퀘스트가 실패했습니다.");
        return { success: false, error: "Request failed." };
      }
    }
  };

  const handleSubmit = async () => {
    const data = getCreditData();
    const myCredit = data.balance;

    if (myCredit < 1000) {
      onClose({ success: false, message: "credit not enough" });
      return false;
    }

    try {
      const creditResult = await saveCredit(data);
      const voteSuccess = await saveVote();

      if (!creditResult.success || !voteSuccess.success) {
        console.log("작업 실패로 인해 변경을 적용하지 않습니다.");
        return false;
      }

      saveData({ credit: creditResult.updatedData });
      // window.alert(
      //   `성공적으로 투표 되었습니다./n 현재 잔액: ${creditResult.updatedData.balance}`
      // );
      // setHasVoteToday(true);
      onClose({ success: true, message: "vote-" + gender });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      return false;
    }
  };

  const ModalComponent = isMobile ? ModalMobile : Modal;

  return (
    <ModalComponent
      title={`이달의 ${genderName} 아이돌`}
      name="ModalVote"
      onClose={onClose}
      width={isMobile ? "" : "525px"}
    >
      <>
        <div className="vote-chart-list" key="modalBody">
          {filteredData.map((idol, index) =>
            !hasvoteToday ? (
              <RadioGroup key={idol.id} onClick={() => handleChange(idol.id)}>
                <IdolChartItem
                  idol={idol}
                  rank={index + 1}
                  selected={selectedIdolId === idol.id}
                />
                <RadioButton
                  value={idol.id}
                  checked={selectedIdolId === idol.id}
                  onChange={setSelectedIdolId}
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
    </ModalComponent>
  );
};

export default ModalVote;
