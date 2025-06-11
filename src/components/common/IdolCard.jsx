import Button from "./Button";
import DonateContext from "../../contexts/DonateContext";
import { useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import creditIcon from "../../assets/icons/credit_113px.svg";
import "../../styles/layout/IdolCard.css";
import "../../styles/common/fonts/font.css";

const IdolCard = ({ idol, donation }) => {
  const { setToDonateIdol } = useContext(DonateContext);

  const handleButtonClick = () => {
    setToDonateIdol({ ...idol, donation });
  };
  const currentDonation = donation?.receivedDonations || 0;
  const targetDonation = donation?.targetDonation || 0;
  const donationAmount = (currentDonation / targetDonation) * 100;
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
        <div className="button-wrapper .font-bold-13-line26-letter2">
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
              <img className="img-credit" src={creditIcon} />
              <div className="blur"></div>
            </div>
            <p>{currentDonation || "0"}</p>
            {/* {idol.totalVote?.toLacaleString() || "0"} 나중에 바꿔주기 */}
          </div>
          <p className="card-deadline font-medium-12">{diffDays}일 남음</p>
        </div>
        <div className="vote-progress-containter">
          <ProgressBar
            completed={donationAmount}
            maxCompleted={100}
            height="2px"
            width="100%"
            baseBgColor="#ffffff"
            bgColor="rgba(249, 109, 105, 1)"
            isLabelVisible={false}
          />
        </div>
      </div>
    </div>
  );
};

export default IdolCard;
