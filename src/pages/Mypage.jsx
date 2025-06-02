import { useState } from "react";
import InterestIdolList from "../components/InterestIdolList";
import MyIdols from "../components/MyIdols";
import Header from "../components/layouts/Header";
import Button from "../components/common/Button";
import "../styles/common/Mypage.css";

const MyPage = () => {
  return (
    <div className="MyPage">
      <Header />
      <MyIdols />
      <InterestIdolList />

      <Button text="+ 추가하기" type="positive" />
    </div>
  );
};

export default MyPage;
