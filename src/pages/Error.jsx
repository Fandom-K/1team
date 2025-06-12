import { Link } from "react-router-dom";
import RefreshButton from "../components/common/Refresh";
import "../styles/layout/Error.css";

const Error = () => {
  return (
    <div className="error-notfound">
      <section className="notfound-container">
        <h1>데이터를 로드하지 못했습니다</h1>
        <p>다시 시도해 주세요</p>
        <Link to="/" className="notfound-link">
          <RefreshButton />
        </Link>
      </section>
    </div>
  );
};

export default Error;
