import idolDeleteBtn from "../../assets/icons/btn_delete.svg";
import IdolProfile from "../../components/common/IdolProfile";

const FavoriteIdols = ({ myFavorIdols, onRemoveFavorite }) => {
  return (
    <div>
      {myFavorIdols.length === 0 ? (
        <p>관심 아이돌이 없습니다.</p>
      ) : (
        myFavorIdols.map((idol) => (
          <div key={idol.id}>
            <IdolProfile idol={idol} />
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
        ))
      )}
    </div>
  );
};

export default FavoriteIdols;
