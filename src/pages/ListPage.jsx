import Header from "../components/layouts/Header";
import IdolChart from "../components/layouts/IdolChart";
import IdolVoteSlide from "../components/layouts/IdolVoteSlide";
import MyCredit from "../components/common/MyCredit";
import "../styles/layout/ListPage.css";
import DonateContext from "../contexts/DonateContext";
import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import ModalDonation from "../components/modals/ModalDonation";
import VoteContext from "../contexts/VoteContext";
import ModalVote from "../components/modals/ModalVote";
import Popup from "../components/modals/Popup";
import CreditContext from "../contexts/CreditContext";

const ListPage = () => {
  const [toDonateIdol, setToDonateIdol] = useState(null);
  const donateModal = useModal();
  const [voteGender, setVoteGender] = useState(null);
  const voteModal = useModal();
  const [voteSuccess, setVoteSuccess] = useState(null);
  const votePopupModal = useModal();
  const [popupMessage, setPopupMessage] = useState(null);
  const [highlightKeyword, setHighlightKeyword] = useState(null);
  const [refreshChart, setRefreshChart] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    if (toDonateIdol !== null) {
      donateModal.openModal();
    }
  }, [toDonateIdol]);

  useEffect(() => {
    //level-up: 크레딧 부족이 아닌, 로컬스토리지 저장 성공, 실패에도 팝업 오픈하기
    if (!voteSuccess || voteSuccess.success == undefined) return;

    if (!voteSuccess.success && voteSuccess.message === "credit not enough") {
      setPopupMessage("앗! 투표하기 위한 크레딧이 부족해요");
      setHighlightKeyword("크레딧");
      votePopupModal.openModal();
    } else if (voteSuccess.success) {
      setPopupMessage("성공적으로 투표 되었습니다.");
      setHighlightKeyword(null);
      votePopupModal.openModal();
    }
  }, [voteSuccess]);

  useEffect(() => {
    if (voteSuccess?.success) {
      setRefreshChart((prev) => !prev);
    }
  }, [voteSuccess]);

  return (
    <div className="ListPage">
      <Header />
      <MyCredit />
      <DonateContext.Provider value={{ toDonateIdol, setToDonateIdol }}>
        <IdolVoteSlide></IdolVoteSlide>
        {donateModal.isOpen && (
          <ModalDonation
            isOpen={donateModal.isOpen}
            onClose={donateModal.closeModal}
          />
        )}
      </DonateContext.Provider>
      <VoteContext.Provider
        value={{ voteGender, setVoteGender, voteModal, setIsMobile }}
      >
        <IdolChart key={refreshChart} />
        {voteModal.isOpen && (
          <ModalVote
            isMobile={isMobile}
            gender={voteGender}
            isOpen={voteModal.isOpen}
            onClose={(result) => {
              voteModal.closeModal();
              setVoteSuccess(result);
            }}
          />
        )}
        {votePopupModal.isOpen && (
          <Popup
            message={popupMessage}
            highlightKeyword={highlightKeyword}
            isOpen={votePopupModal.isOpen}
            onClose={votePopupModal.closeModal}
          />
        )}
      </VoteContext.Provider>
    </div>
  );
};

export default ListPage;
