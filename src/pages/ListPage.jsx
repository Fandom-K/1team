import Header from "../components/layouts/Header";
import IdolChart from "../components/layouts/idolChart";
import IdolVoteSlide from "../components/layouts/IdolVoteSlide";

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
