import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import getIdol from "../../services/getIdol";
import ProfileChunk from "../ProfileChunk";

const MyPageMobile = ({ selectedIdolsIds, onToggle }) => {
  const [groupedIdols, setGroupedIdols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllIdols = async () => {
      try {
        setLoading(true);
        const data = await getIdol();
        setGroupedIdols(chunkArray(data, 9));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllIdols();
  }, []);

  const chunkArray = (arr, size) => {
    if (!arr || arr.length === 0) return [];
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  if (loading)
    return (
      <div>
        <Spiner />
      </div>
    );
  if (error)
    return (
      <div>
        <Error />
      </div>
    );

  return (
    <Swiper slidesPerView={1} spaceBetween={20}>
      {groupedIdols.map((group, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 2fr)",
              gap: "10px",
            }}
          >
            {group.map((idol) => (
              <ProfileChunk
                key={idol.id}
                className="ProfileChunk"
                idol={idol}
                isSelected={selectedIdolsIds.includes(idol.id)}
                onClick={() => onToggle(idol)}
              />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MyPageMobile;
