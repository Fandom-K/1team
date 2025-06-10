import Button from "./Button";
import "../../styles/layout/IdolCard.css";
import { Link } from "react-router-dom";
import "../../styles/common/fonts/font.css";
import { useContext } from "react";
import DonateContext from "../../contexts/DonateContext";

const IdolCard = ({ idol }) => {
  const { setToDonateIdol } = useContext(DonateContext);

  const handleButtonClick = () => {
    setToDonateIdol(idol);
  };

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
          {idol.group} {idol.name} 지하철 광고
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
            <p>6000</p>
            {/* {idol.totalVote?.toLacaleString() || "0"} 나중에 바꿔주기 */}
          </div>
          <p className="card-deadline">5일 남음</p>
        </div>
      </div>
    </div>
  );
};

export default IdolCard;
