import Button from "./Button";
import "../../styles/layout/IdolCard.css";
import { Link } from "react-router-dom";
import "../../styles/common/fonts/font.css";

const IdolCard = ({ idol }) => {
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
          <Button text="후원하기" corner="angular" type="positive" />
          {/* </Link> */}
        </div>
      </div>

      <div className="card-feature">
        <h3 className="font-regular-16-line18-letter-neg017">강남역 광고</h3>
        <h2 className="font-medium-18">
          {idol.group} {idol.name} 지하철 광고
        </h2>
        <div className="vote-amount">
          <span className="card-vote">
            {/* {idol.totalVote?.toLacaleString() || "0"} */}
          </span>
          <span className="card-deadline">5일 남음</span>
        </div>
      </div>
    </div>
  );
};

export default IdolCard;
