import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import "../styles/common/fonts/font.css";
import "../index.css";
import "./LandingPage.css";
import logo from "../../src/assets/images/logo.svg";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <section className="intro">
        <div className="overlay"></div>
        <div className="intro-top">
          <h1>
            내가 좋아하는 아이돌을 <br />
            가장 <span>쉽게 덕질</span> 하는 방법
          </h1>
          <Link>
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

      <div className="step-wrapper">
        {/* ------------ step1 ------------- */}
        <section className="step step1">
          <div className="overlay"></div>
          <div className="step-top">
            <h2>후원하기</h2>
            <p>
              좋아하는 아이돌에게 <br />
              쉽게 조공해 보세요
            </p>
          </div>
          <div className="step-bottom">
            <div
              className="step-img img1"
              role="img"
              aria-label="후원하기 step1"
            />
          </div>
        </section>

        {/* ------------ step2 ------------- */}
        <section className="step step2">
          <div className="overlay"></div>
          <div className="step-top">
            <h2>이달의 아티스트</h2>
            <p>
              내 아티스트에게 1등의
              <br />
              영예를 선물하세요
            </p>
          </div>
          <div className="step-bottom">
            <div
              className="step-img img1"
              role="img"
              aria-label="이달의 아티스트 step2"
            />
          </div>
        </section>

        {/* ------------ step3 ------------- */}
        <section className="step step3">
          <div className="overlay"></div>
          <div className="step-top">
            <h2>나만의 아티스트</h2>
            <p>
              좋아하는 아티스트들의
              <br />
              소식을 모아보세요
            </p>
          </div>
          <div className="step-bottom">
            <div
              className="step-img img1"
              role="img"
              aria-label="나만의 아티스트 step3"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
