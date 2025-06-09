import "../../styles/layout/MyCredit.css";
const MyCredit = () => {
  return (
    <div className="mycredit">
      <div className="credit-status">
        <div className="credit-title">
          <p>내 크레딧</p>
        </div>
        <div>
          <div className="credit-now">
            <div className="image-blur">
              <img
                className="credit_image"
                src="../../../src/assets/icons/credit_113px.svg"
              />
              <div className="blur"></div>
            </div>
            <p>36,000</p>
          </div>
        </div>
      </div>
      <div>
        <button className="charge-button">충전하기</button>
      </div>
    </div>
  );
};
export default MyCredit;
