import GradientProfile from "../components/common/GradientProfile";
import icCheck from "../assets/icons/ic_check.png";

const GradientVote = ({ idol, isSelected }) => {
  return (
    <div>
      {idol && (
        <div style={{ position: "relative", width: "70px", height: "70px" }}>
          <GradientProfile
            style={{
              width: "70px",
              height: "70px",
            }}
            isSelected={isSelected}
          />
          <img
            className="inner-image"
            src={idol.profilePicture}
            alt={idol.name}
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              top: "5px",
              left: "5px",
              padding: "2.5px",
            }}
          />
          {isSelected && (
            <div>
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: "7px",
                  left: "7px",
                  width: "80%",
                  height: "80%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(to right, rgba(249, 109, 105, 0.5), rgba(254, 84, 147, 0.5))",
                }}
              />
              <img
                className="selected"
                src={icCheck}
                alt="선택됨"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50px",
                  height: "auto",
                  zIndex: "2",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GradientVote;
