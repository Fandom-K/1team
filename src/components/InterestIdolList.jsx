import ProfileChunk from "./ProfileChunk";
import "../styles/InterestIdolList.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const InterestIdolList = () => {
  const [profiles, setProfiles] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/api/getProfiles") // 서버 API 주소로 변경
  //     .then((response) => {
  //       // 서버에서 받은 데이터가 배열이라고 가정
  //       setProfiles(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("데이터 요청 실패:", error);
  //     });
  // }, []);

  return (
    <div className="InterestIdolList">
      <h3>관심 있는 아이돌을 추가해보세요.</h3>
      <Swiper
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
      >
        {profiles.map((profile) => (
          <SwiperSlide key={profile.id}>
            <ProfileChunk size={98} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InterestIdolList;
