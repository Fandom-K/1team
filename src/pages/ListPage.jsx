import Header from "../components/layouts/Header";
import IdolChart from "../components/layouts/idolChart";
import IdolVoteSlide from "../components/layouts/IdolVoteSlide";
import "../styles/layout/ListPage.css";

const ListPage = () => {
  return (
    <div className="ListPage">
      <Header />
      <IdolVoteSlide></IdolVoteSlide>
      <IdolChart />
    </div>
  );
};

export default ListPage;
