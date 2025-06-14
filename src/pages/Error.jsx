import RefreshButton from "../components/common/Refresh";
import styles from "../styles/layout/Error.module.css";

const Error = () => {
  return (
    <div className={styles["error-notfound"]}>
      <div className={styles["notfound-container"]}>
        <h1>데이터를 로드하지 못했습니다</h1>
        <p>다시 시도해 주세요</p>
        <RefreshButton />
      </div>
    </div>
  );
};

export default Error;
