import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import logo from "../../src/assets/images/logo.svg";
import RefreshButton from "../components/common/Refresh";
import "../styles/layout/Error.css";

const Error = () => {
  return (
    <div className="notfound">
      <div className="notfound-overlay"></div>
      <section className="notfound-container">
        <img className="logo" src={logo} alt="Fadom-K Logo" />
        <h1>데이터 로드에 실패했습니다</h1>
        <p>다시 시도해 주세요</p>
        <Link to="/" className="notfound-link">
          <RefreshButton />
        </Link>
      </section>
    </div>
  );
};

export default Error;
