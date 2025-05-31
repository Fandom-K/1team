// import "./IdolProfile.css";
import { useRef, useEffect } from "react";
import idolimg from "./fandomK-img9.png";

function IdolProfile() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //좌표 선언
    const centerX = 34; // 캔버스 중심 x
    const centerY = 35; // 캔버스 중심 y
    const radius = 33; // 테두리 두께 포함 반지름 px
    const length = 100; // 그라데이션 길이 px(선분의 전체 길이)
    const angleRad = (400 * Math.PI) / 180; // 400도를 라디안으로 변환

    const x1 = centerX + (length / 2) * Math.cos(angleRad);
    const y1 = centerY + (length / 2) * Math.sin(angleRad);
    const x2 = centerX - (length / 2) * Math.cos(angleRad);
    const y2 = centerY - (length / 2) * Math.sin(angleRad);

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(1, "rgba(249, 104, 104, 1)");
    gradient.addColorStop(0.5, "rgba(0, 148, 255, 1)");
    gradient.addColorStop(0, "rgba(91, 253, 15, 1)");

    // 원형 테두리 그리기
    ctx.beginPath(); // 새그림 시작
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); //원 그리기
    ctx.strokeStyle = gradient; // 선 색상(그라데이션) 적용
    ctx.lineWidth = 1; // 선 두께, 미지정시 기본 1px
    ctx.stroke(); // 그리기
  }, []);

  return (
    <div className="IdolProfile">
      {/* 프로필 사진 */}
      <img
        src={idolimg}
        alt="Profile"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
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
          top: 3,
          left: 4,
        }}
      />
    </div>
  );
}

export default IdolProfile;

// #f96868, #0094ff, #5bfd0f
// linear-gradient(320deg,rgba(91, 253, 15, 1) 0%, rgba(0, 148, 255, 1) 50%, rgba(249, 104, 104, 1) 100%)
// 테두리 포함 70px 이미지 60px (패딩 4px 보더 1px)
