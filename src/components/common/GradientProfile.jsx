import { useEffect, useRef } from "react";

export default function GradientProfile({ style, isSelected }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // 디스플레이 크기
    const displaySize = 100;
    // 실제 캔버스 크기 (2배 해상도)
    const canvasSize = displaySize * 2;

    // 캔버스 크기 설정
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // 이미지 스무딩 설정
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    // 중심점과 반지름
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10;

    // 이후 그라데이션 코드
    const angleDeg = 400;
    const angleRad = (angleDeg * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(angleRad);
    const y1 = centerY + radius * Math.sin(angleRad);
    const x2 = centerX - radius * Math.cos(angleRad);
    const y2 = centerY - radius * Math.sin(angleRad);

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);

    //색상 변수
    const colorStart = isSelected
      ? "rgba(249, 110, 104, 1)"
      : "rgba(91, 253, 15, 0)";
    const colorMid = isSelected
      ? "rgba(255, 248, 249, 1))"
      : "rgba(0, 148, 255, 0.7)";
    const colorEnd = isSelected
      ? "rgba(254, 86, 145, 1)"
      : "rgba(249, 104, 104, 0.8)";

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    // 원 그리기
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [isSelected]); //셀렉트 될 때 다른 색 랜더링

  return <canvas ref={canvasRef} style={style} />;
}
