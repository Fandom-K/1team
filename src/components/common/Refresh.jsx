import Button from "../common/Button";
import styles from "../../styles/layout/Error.module.css";

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.replace(window.location.href);
  }; // 현재 페이지를 새로고침하고, history 기록에 남지 않음.

  return (
    <div className={styles["ref-btn"]}>
      <Button
        type="positive"
        corner="angular"
        text="새로 고침"
        alt="더보기"
        onClick={handleRefresh}
      />
    </div>
  );
};

export default RefreshButton;
