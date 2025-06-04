import ProfileChunk from "./ProfileChunk";
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/InterestIdolList.css";
import "../styles/common/fonts/font.css";
// import { Navigation, Pagination } from "swiper/modules";

const InterestIdolList = ({ size }) => {
  return (
    <div className="InterestIdolList">
      <h3 className="font-bold-16-line26">관심 있는 아이돌을 추가해보세요.</h3>
      <ProfileChunk className="ProfileChunk" size={size} />
    </div>
  );
};

export default InterestIdolList;
