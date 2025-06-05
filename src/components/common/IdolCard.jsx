import Button from "./Button";
import "../../styles/layout/IdolCard.css";
import { Link } from "react-router-dom";

const IdolCard = ({ idol }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={idol.profilePicture}
          alt="카드이미지"
        ></img>
        <div className="button-wrapper">
          <Link to="">
            <Button
              className="a"
              text="후원하기"
              cornner="angular"
              alt="후원하기 버튼"
            />
          </Link>
        </div>
      </div>

      <div className="card-feature">
        <h3>강남역 광고</h3>
        <h2>
          {idol.group} {idol.name} 지하철 광고
        </h2>
        <div className="vote-amount">
          <span className="card-vote">
            {idol.totalVote?.toLacaleString() || "0"}
          </span>
          <span className="card-deadline">5일 남음</span>
        </div>
      </div>
    </div>
  );
};

export default IdolCard;
