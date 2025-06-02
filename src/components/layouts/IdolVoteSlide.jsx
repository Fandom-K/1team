// IdolSlider.jsx
import {
  Swiper,
  SwiperSlide,
  Pagination,
  Navigation,
  Scrollbar,
} from "swiper/react";
// import Chawon from "../../../public";
// import Roze from "/1team/public/IdolImage/fandomK-img-2.jpg";
// import Jennie from "/1team/public/IdolImage/fandomK-img-1.jpg";
// import Kazuha from "/1team/public/IdolImage/fandomK-img-1.jpg";

const IdolSlider = () => {
  const images = [
    {
      name: "채원",
      url: "/1team/public/IdolImage/fandomK-img-1.jpg",
    },
    {
      name: "로제",
      url: "/1team/public/IdolImage/fandomK-img-2.jpg",
    },
    {
      name: "제니",
      url: "/1team/public/IdolImage/fandomK-img-3.jpg",
    },
    {
      name: "카즈하",
      url: "/1team/public/IdolImage/fandomK-img-4.jpg",
    },
  ];

  return (
    <div className="">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
      >
        {images.map((idol, index) => (
          <SwiperSlide key={index}>
            <div className="checkbox">
              <img src={idol.url} alt={idol.name} className="rounded" />
              <p className=" lg font-semibold">{idol.name}</p>
            </div>
            {/* <idolCard id="id" group="group name"/> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IdolSlider;
