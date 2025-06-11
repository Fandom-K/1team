import idolDeleteBtn from "../../assets/icons/btn_delete.svg";
import IdolProfile from "../../components/common/IdolProfile";

const FavoriteIdols = ({ myFavorIdols, selectedIdolIds, onRemoveFavorite }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {myFavorIdols.length === 0 ? (
        <p>관심 아이돌이 없습니다.</p>
      ) : (
        myFavorIdols.map((idol) => {
          const isSelected = selectedIdolIds.includes(idol.id);
          return (
            <div key={idol.id}>
              <IdolProfile idol={idol} isSelected={isSelected} />
              <button
                className="idol-delete-Btn"
                onClick={() => onRemoveFavorite(idol.id)}
              >
                <img src={idolDeleteBtn} alt="삭제 버튼" />
              </button>
              <div className="idol-info">
                <h4>{idol.name}</h4>
                <p>{idol.group}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FavoriteIdols;
