import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import logo from "../../src/assets/images/logo.svg";

import "../styles/layout/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-overlay"></div>
      <section className="notfound-container">
        <img className="logo" src={logo} alt="Fadom-K Logo" />
        <h1>404</h1>
        <p>
          죄송합니다. <br />
          현재 찾을 수 없는 페이지를 요청 하셨습니다.
        </p>
        <Link to="/" className="notfound-link">
          <Button
            type="positive"
            corner="angular"
            text="홈으로 돌아가기"
            alt="더보기"
          />
        </Link>
      </section>
    </div>
  );
};

export default NotFound;
