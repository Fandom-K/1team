import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useState, useEffect } from "react";

import getDonationIdol from "../../services/getDonationIdol";
import IdolCard from "../../components/common/IdolCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/common/IdolVoteSlide.css";

const IdolVoteSlide = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [donations, setDonations] = useState(null);

  // //데이터 요청
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const votedata = await getDonationIdol();
        setDonations(votedata);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);

  //       const votedata = await getDonationIdol();

  //       // 💡 donation을 idolId 기준으로 객체로 변환
  //       const donationMap = votedata.reduce((acc, item) => {
  //         acc[item.idolId] = item;
  //         return acc;
  //       }, {});

  //       setDonations(donationMap); // 기존 배열이 아니라 Map 형태로 저장
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  // swiper.on('slideChange', function () {
  //   console.log('slide changed'); function() {
  //     if (this.realIndex == 0) {
  //       $swiperPrev.classList.add('swiper-button-disabled');
  //       startNum = false;
  //     } else {
  //       $swiperPrev.classList.remove('swiper-button-disabled');
  return (
    <div className="vote-slide">
      <div className="prev-button-wrapper">
        <div className="swiper-button-prev"></div>
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slideToClickedSlide="true"
        speed={500}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
            navigation: {
              enabled: false,
            },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
            navigation: {
              enabled: false,
            },
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {/* {idols.map((idol) => {
          const matchedDonation = donations.find(
            (donation) => donation.idolId === idol.id
          ); // id로 매칭
          <SwiperSlide>
            <IdolCard idol={idol} donation={matchedDonation} />
          </SwiperSlide>;
        })} */}
        {donations.map((donation) => (
          <SwiperSlide key={donation.id}>
            <IdolCard donation={donation} />
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
