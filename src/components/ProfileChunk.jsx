import IdolProfile from "./common/IdolProfile";

const ProfileChunk = ({ idol, size, isSelected, onClick }) => {
  return (
    <div className="ProfileChunk" onClick={onClick}>
      <IdolProfile
        className="idol-profile"
        key={idol.id}
        size={size}
        idol={idol}
        isSelected={isSelected}
      />

      <div className="chunk-name">{idol.name}</div>
      <div className="chunk-group">{idol.group}</div>
    </div>
  );
};

export default ProfileChunk;
