import ProfileChunk from "./ProfileChunk";
import "../styles/MyIdols.css";
import "../styles/common/fonts/font.css";

const MyIdols = ({ size }) => {
  return (
    <div className="MyIdols ">
      <h3 className="font-bold-16-line26">내가 관심있는 아이돌</h3>
      <ProfileChunk className="ProfileChunk" size={size} />
    </div>
  );
};

export default MyIdols;
