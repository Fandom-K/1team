import IdolProfile from "./common/IdolProfile";
import { useState } from "react";

const ProfileChunk = ({ idol, size }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  // 선택 토글 함수
  const handleSelect = (idolId) => {
    setSelectedIds((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
  };

  return (
    <div className="ProfileChunk">
      <IdolProfile
        className="idol-profile"
        key={idol.id}
        size={size}
        idol={idol}
        isSelected={selectedIds.includes(idol.id)}
        onClick={() => handleSelect(idol.id)}
      />
      {/* 이름과 그룹도 보여주기 */}
      <div className="chunk-name">{idol.name}</div>
      <div className="chunk-group">{idol.group}</div>
    </div>
  );
};

export default ProfileChunk;
