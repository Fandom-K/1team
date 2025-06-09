import Header from "../components/layouts/Header";
import IdolChart from "../components/layouts/idolChart";
import IdolVoteSlide from "../components/layouts/IdolVoteSlide";
import MyCredit from "../components/common/MyCredit";
import "../styles/layout/ListPage.css";

const ListPage = () => {
  return (
    <div className="ListPage">
      <Header />
      <MyCredit />
      <IdolVoteSlide></IdolVoteSlide>
      <IdolChart />
    </div>
  );
};

export default ListPage;
