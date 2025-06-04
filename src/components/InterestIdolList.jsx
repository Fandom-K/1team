import ProfileChunk from "./ProfileChunk";
import "../styles/InterestIdolList.css";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

const InterestIdolList = () => {
  return (
    <div className="InterestIdolList">
      <h3>관심 있는 아이돌을 추가해보세요.</h3>
      {/* <Swiper
        spaceBetween={20}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
      > */}
      <ProfileChunk size={98} />
    </div>
  );
};

export default InterestIdolList;
