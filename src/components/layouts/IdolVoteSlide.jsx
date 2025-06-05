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
    <div className="voteSlide">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={10}
        navigation
        slideToClickedSlide="true"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)} //알아오기
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
    </div>
  );
};
export default IdolVoteSlide;
