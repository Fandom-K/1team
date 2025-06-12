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
import PopupWarning from "../components/modals/PopupWarning";
import ChargeContext from "../contexts/ChargeContext";

const ListPage = () => {
  const [toDonateIdol, setToDonateIdol] = useState(null);
  const donateModal = useModal();
  const [voteGender, setVoteGender] = useState(null);
  const voteModal = useModal();
  const [voteSuccess, setVoteSuccess] = useState(null);
  const alertPopupModal = useModal();
  const [popupMessage, setPopupMessage] = useState(null);
  const [highlightKeyword, setHighlightKeyword] = useState(null);
  const [refreshChart, setRefreshChart] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [donateSuccess, setDonateSuccess] = useState(null);
  const [voteModalMounting, setVoteModalMounting] = useState(null);
  const mountingErrorPopupModal = useModal();
  const chargeModal = useModal();
  const [chargeSuccess, setChargeSuccess] = useState(null);

  useEffect(() => {
    if (toDonateIdol !== null) {
      donateModal.openModal();
    }
  }, [toDonateIdol]);

  useEffect(() => {
    if (!chargeSuccess || chargeSuccess == undefined) return;

    if (chargeSuccess) {
      setPopupMessage("충전 완료 🎉");
      setHighlightKeyword(null);
    } else {
      setPopupMessage(
        "죄송합니다. 충전전 처리 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
      setHighlightKeyword(null);
    }
    alertPopupModal.openModal();
  }, [chargeSuccess]);

  useEffect(() => {
    if (!voteSuccess || voteSuccess.success == undefined) return;

    if (!voteSuccess.success) {
      if (voteSuccess.message === "credit not enough") {
        setPopupMessage("앗! 투표하기 위한 크레딧이 부족해요");
        setHighlightKeyword("크레딧");
      } else {
        setPopupMessage(
          "죄송합니다. 투표 처리 중 오류가 발생했습니다. 다시 시도해 주세요."
        );
        setHighlightKeyword(null);
      }
    } else if (voteSuccess.success) {
      setPopupMessage("투표 완료 🎉");
      setHighlightKeyword(null);
    }
    alertPopupModal.openModal();
  }, [voteSuccess]);

  useEffect(() => {
    if (voteSuccess?.success) {
      setRefreshChart((prev) => !prev);
    }
  }, [voteSuccess]);

  useEffect(() => {
    if (!donateSuccess || donateSuccess.success == undefined) return;

    if (!donateSuccess.success) {
      setPopupMessage(
        "죄송합니다. 후원 처리 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
      setHighlightKeyword(null);
    } else if (donateSuccess.success) {
      setPopupMessage("후원 완료 🎉");
      setHighlightKeyword(null);
    }
    alertPopupModal.openModal();
  }, [donateSuccess]);

  useEffect(() => {
    if (voteModalMounting === false) {
      voteModal.closeModal();
      mountingErrorPopupModal.openModal();
    }
  }, [voteModalMounting]);

  return (
    <div className="ListPage">
      <Header />
      <ChargeContext.Provider value={{ chargeModal, setChargeSuccess }}>
        <MyCredit />
      </ChargeContext.Provider>
      <DonateContext.Provider value={{ toDonateIdol, setToDonateIdol }}>
        <IdolVoteSlide></IdolVoteSlide>
        {donateModal.isOpen && (
          <ModalDonation
            isOpen={donateModal.isOpen}
            onClose={(result) => {
              donateModal.closeModal();
              setDonateSuccess(result);
            }}
          />
        )}
      </DonateContext.Provider>
      <VoteContext.Provider
        value={{
          voteGender,
          setVoteGender,
          voteModal,
          setIsMobile,
          setVoteModalMounting,
        }}
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
        {alertPopupModal.isOpen && (
          <Popup
            message={popupMessage}
            highlightKeyword={highlightKeyword}
            isOpen={alertPopupModal.isOpen}
            onClose={() => {
              alertPopupModal.closeModal();
              location.href = "/list";
            }}
          />
        )}
        {mountingErrorPopupModal.isOpen && (
          <PopupWarning
            message={"네트워크 에러가 발생했습니다. \n다시 로드 해주세요."}
            isOpen={mountingErrorPopupModal.isOpen}
            onClose={mountingErrorPopupModal.closeModal}
          />
        )}
      </VoteContext.Provider>
    </div>
  );
};

export default ListPage;
