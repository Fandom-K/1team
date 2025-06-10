import GradientProfile from "../components/common/GradientProfile";
import getIdol from "../services/getIdol";
import { useEffect, useState } from "react";
import icCheck from "../assets/icons/ic_check.png";

const GradientVote = ({ isSelected }) => {
  const [idols, setIdols] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //임시 데이터 불러오기 함수
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getIdol();
        setIdols(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  // 로딩, 에러 처리
  if (loading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <>
      {Array.isArray(idols) && idols.length > 0 && (
        <div style={{ position: "relative", width: "70px", height: "70px" }}>
          <GradientProfile
            style={{
              width: "70px",
              height: "70px",
            }}
            isSelected={isSelected}
          />
          <img
            className="inner-image"
            src={idols[0].profilePicture}
            alt={idols[0].name}
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              top: "5px",
              left: "5px",
              padding: "2.5px",
            }}
          />
          {isSelected && (
            <>
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(to right, rgba(249, 109, 105, 0.5), rgba(254, 84, 147, 0.5))",
                }}
              />
              <img
                className="selected"
                src={icCheck}
                alt="선택됨"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50px",
                  height: "auto",
                  zIndex: "2",
                }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GradientVote;
