import { useEffect, useState } from "react";
import "../../styles/layout/IdolChartTab.css";
import Button from "../common/Button";
import useAllIdolList from "../../hooks/useAllIdolList";

const IdolChartItem = ({ idol, rank }) => {
  return (
    <div className="IdolChartItem">
      <div className="idolchart-item__info">
        <img
          src={
            idol.profilePicture ||
            "https://cphoto.asiae.co.kr/listimglink/1/2011062210300334840_3.jpg"
          }
          alt={idol.name}
        />
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
  // 화면 사이즈 감지하는 스테이트: window객체의 innerWidth에 접근하면 현재 브라우저의 넓이에 접근할 수 있음
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 745);

  useEffect(() => {
    // handleResize로 isWideScreen의 값 변경: 불린값/동적인 느낌
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 745);
    };

    window.addEventListener("resize", handleResize); // useEffect안에서 addEventListener를 사용하는 형태
    // 반드시 언마운트되는 시점에 removeEventListener로 정리해줘야함 : 메모리누수 방지 : 클린업 함수
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  const filtered = allIdols
    .filter((idol) => idol.gender === gender)
    .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
    .slice(0, isWideScreen ? 10 : 5); //  조건에 따라 5명 or 10명

  return (
    <>
      <div className="IdolChartTab">
        {filtered.map((idol, index) => (
          <IdolChartItem key={idol.id} idol={idol} rank={index + 1} />
        ))}
      </div>
      <div className="IdolChartTab__button-wrapper">
        <Button
          text="더 보기"
          alt="차트 투표하기 버튼"
          type="more"
          corner="angular"
        />
      </div>
    </>
  );
};

export default IdolChartTab;
