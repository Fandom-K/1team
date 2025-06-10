import Button from "./Button";
import DonateContext from "../../contexts/DonateContext";
import { useContext, useState } from "react";

import "../../styles/layout/IdolCard.css";
import "../../styles/common/fonts/font.css";

const IdolCard = ({ idol, donation }) => {
  const { setToDonateIdol } = useContext(DonateContext);

  const handleButtonClick = () => {
    setToDonateIdol(idol);
  };

  const now = new Date();
  const deadlineDate = donation?.deadline ? new Date(donation.deadline) : null;

  let diffDays = 0;
  if (deadlineDate) {
    const diffMs = deadlineDate - now; // 밀리초 차이
    diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // 남은 일수 (올림처리)
  }

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={idol.profilePicture}
          alt="카드이미지"
        />
        <div className="img-blur-overlay"></div>
        <div className="button-wrapper">
          {/* <Link to=""> */}
          <Button
            text="후원하기"
            corner="angular"
            type="positive"
            onClick={handleButtonClick}
          />
          {/* </Link> */}
        </div>
      </div>

      <div className="card-feature">
        <h3 className="font-regular-16-line18-letter-neg017">강남역 광고</h3>
        <h2 className="font-medium-18">
          {donation?.subtitle || "후원 정보 없음"}
        </h2>
        <div className="vote-amount">
          <div className="card-vote">
            <div className="img-blur">
              <img
                className="img-credit"
                src="../../../src/assets/icons/credit_113px.svg"
              />
              <div className="blur"></div>
            </div>
            <p>{donation?.receivedDonations || "후원된 금액이 없습니다"}</p>
            {/* {idol.totalVote?.toLacaleString() || "0"} 나중에 바꿔주기 */}
          </div>
          <p className="card-deadline">{diffDays}일 남음</p>
        </div>
        <div className="vote-progress-containter">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default IdolCard;
