import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import getIdol from "../../services/getIdol";
import IdolCard from "../../components/common/IdolCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/common/idolVoteSlide.css";

const IdolVoteSlide = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Idols, setIdols] = useState(null);
  const [swiper, setSwiper] = useState(null);

  //데이터 요청
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getIdol();
        setIdols(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <div className="vote-slide">
      <div className="prev-button-wrapper">
        <div className="swiper-button-prev"></div>
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onBeforeInit={(swipper) => setSwiper(swipper)}
        slideToClickedSlide="true"
        onSlideChange={() => console.log("slide change")}
        speed={500}
        pagination={{
          clickable: true,
          type: "fraction",
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {Idols.map((idol) => (
          <SwiperSlide>
            <IdolCard idol={idol} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="next-button-wrapper">
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
};
export default IdolVoteSlide;
