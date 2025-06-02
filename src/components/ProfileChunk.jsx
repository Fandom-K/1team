import { useState } from "react";
import IdolProfile from "./common/IdolProfile";
import { SizeProvider } from "../../src/contexts/SizeContext";
import "../styles/ProfileChunk.css";
import useAllIdolList from "../hooks/useAllIdolList";

const ProfileChunk = () => {
  const { allIdols, loading, error } = useAllIdolList(20); // 50개 limit으로 데이터 불러옴
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 아이돌 인덱스 저장

  if (loading) return <div>Loading...</div>; // 로딩중일 때 보여줄 화면
  if (error) return <div>Error: {error.message}</div>; // 오류 발생 시

  const handleSelect = (index) => {
    setSelectedIndex(index); // 아이돌 클릭 시 선택 인덱스 변경
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* 최상위 부모 div로 감싸기 */}
      {allIdols.map((idol, index) => (
        <div key={idol.id} style={{ margin: "10px" }}>
          {" "}
          {/* 각 아이돌 블록 감싸기, 고유 key도 넣기 */}
          {/* 프로필 컴포넌트 */}
          <IdolProfile
            item={idol}
            isSelected={index === selectedIndex}
            onSelect={() => handleSelect(index)}
            borderColor="#f96d69"
          />
          {/* 이름과 그룹도 보여주기 */}
          <div>{idol.name}</div>
          <div>{idol.group}</div>
        </div>
      ))}
    </div>
  );
};

export default ProfileChunk;
