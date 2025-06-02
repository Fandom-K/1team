import { useState, useEffect } from "react";
import IdolProfile from "./common/IdolProfile";
import { SizeProvider } from "../../src/contexts/SizeContext";
import { getidols } from "./api";
import "./ProfileChunk.css";

const ProfileChunk = ({ size = 70 }) => {
  const [selected, setSelected] = useState(false); // 선택 상태 관리
  const [idols, setidols] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getidols();
      const idolsList = res.list;
      setidols(idolsList);
    };
    fetch();
  }, []);

  const handleSelect = () => {
    setSelected((prev) => !prev); // 클릭하면 선택/해제 토글
  };

  return (
    <SizeProvider size={size}>
      <div className="ProfileChunk">
        {idols.length > 0 ? (
          idols.map((idol) => (
            <div key={idol.id}>
              <IdolProfile
                item={idol}
                isSelected={selected}
                onSelect={handleSelect}
              />
              <p>{idol.name}</p>
              <p>{idol.group}</p>
            </div>
          ))
        ) : (
          <p>아티스트 없음</p>
        )}
      </div>
    </SizeProvider>
  );
};

export default ProfileChunk;
