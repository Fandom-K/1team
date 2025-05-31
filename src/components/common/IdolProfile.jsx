// import "./IdolProfile.css";
import { useState, useRef, useEffect } from "react";
import idolimg from "./fandomK-img9.png"; //임시 이미지
//import axios from "axios";

const IdolProfile = () => {
  // const [imageSrc, setImageSrc] = useState("");
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   axios
  //     .get("https://example.com/api/user/profile") //예시주소
  //     .then((response) => {
  //       // 응답에서 이미지 URL 추출 (실제 필드 명에 맞게 조정)
  //       setImageSrc(response.data.profilePicture);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the profile image:", error);
  //     });
  // }, []); //빈배열

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //좌표 선언
    const centerX = 34; // 캔버스 중심 x
    const centerY = 35; // 캔버스 중심 y
    const radius = 33; // 테두리 두께 포함 반지름 px 단위
    const gradient = ctx.createLinearGradient(
      centerX,
      centerY - radius,
      centerX,
      centerY + radius
    );
    ctx.clearRect(0, 0, 100, 100); // 캔버스 초기화

    gradient.addColorStop(0, "rgba(249, 104, 104, 1)");
    gradient.addColorStop(0.5, "rgba(0, 148, 255, 1)");
    gradient.addColorStop(1, "rgba(91, 253, 15, 1)");

    // 원형 테두리 그리기
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1; // 선 두께, 미지정시 기본 1px
    ctx.stroke(); // 그리기
  }, []);

  return (
    <div>
      {/* 프로필 사진 */}
      <img
        src={idolimg}
        alt="Profile"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          position: "absolute",
          top: 5,
          left: 4,
        }}
      />
      {/* 캔버스는 원형 테두리를 그리기 위한 것 */}
      <canvas
        ref={canvasRef}
        width={70} // 내부 (링) 크기 px
        height={70}
        style={{
          // 캔버스 전체 크기
          width: "70px",
          height: "70px",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default IdolProfile;
