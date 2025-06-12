import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import "../styles/layout/LandingPage.css";

import logo from "../../src/assets/images/logo.svg";
import Home1 from "../../src/assets/images/phone-Home1-pc.png";
import Home2 from "../../src/assets/images/phone-Home2-pc.png";
import Home3 from "../../src/assets/images/phone-Home3-pc.png";

const IntroSection = () => (
  <section className="intro">
    <div className="intro-overlay"></div>
    <div className="intro-top">
      <h1 className="font-regular-20">
        내가 좋아하는 아이돌을
        <br />
        가장 <span>쉽게 덕질</span> 하는 방법
      </h1>
      <Link to="/">
        <img className="logo" src={logo} alt="Fadom-K Logo" />
      </Link>
    </div>
    <div className="intro-bottom">
      <Link to="/list">
        <Button
          type="positive"
          corner="angular"
          text="지금 시작하기"
          alt="더보기"
        />
      </Link>
    </div>
  </section>
);

const StepSection = ({
  stepClass,
  title,
  descriptionLines,
  imgSrc,
  imgAlt,
}) => (
  <section className={`step ${stepClass}`}>
    <div className="step-overlay"></div>
    <div className="step-top">
      <h2 className="font-medium-16">{title}</h2>
      <p className="font-bold-20-line26">
        {descriptionLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== descriptionLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
    <div className="step-bottom">
      <img className="step-phone-mockup" src={imgSrc} alt={imgAlt} />
    </div>
  </section>
);

const LandingPage = () => {
  // steps 배열: 데이터 저장소
  const steps = [
    {
      stepClass: "step1",
      title: "후원하기",
      descriptionLines: ["좋아하는 아이돌에게", "쉽게 조공해 보세요"],
      imgSrc: Home1,
      imgAlt: "후원하기 화면",
    },
    {
      stepClass: "step2",
      title: "이달의 아티스트",
      descriptionLines: ["내 아티스트에게 1등의", "영예를 선물하세요"],
      imgSrc: Home2,
      imgAlt: "이달의 아티스트 화면",
    },
    {
      stepClass: "step3",
      title: "나만의 아티스트",
      descriptionLines: ["좋아하는 아티스트들의", "소식을 모아보세요"],
      imgSrc: Home3,
      imgAlt: "나만의 아티스트 화면",
    },
  ];

  return (
    <div className="LandingPage">
      <IntroSection />
      <div className="step-wrapper">
        {steps.map((step) => (
          <StepSection key={step.stepClass} {...step} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
