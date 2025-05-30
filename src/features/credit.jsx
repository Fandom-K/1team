/**
 * 크레딧을 충전하고 내역을 기록함
 * @param {number} amount - 충전할 금액
 */

import { loadData, saveData } from "../utils/storage.js";

export function chargeCredit(amount) {
  const data = loadData(); // 기존 데이터 불러오기
  data.credit.balance += amount; // 잔액 증가
  data.credit.history.push({
    // 거래 내역 추가
    type: "charge", // 타입: 충전
    amount, // 금액
    date: new Date().toISOString(), // 현재 날짜와 시간 기록
  });
  saveData(data); // 변경된 데이터 저장
}

/**
 * 크레딧을 사용하고 내역을 기록함
 * 잔액이 부족하면 사용 불가
 * @param {number} amount - 사용할 금액
 * @returns {boolean} - 성공 여부 반환
 */
export function useCredit(amount) {
  const data = loadData(); // 기존 데이터 불러오기

  if (data.credit.balance >= amount) {
    // 잔액이 충분한 경우
    data.credit.balance -= amount; // 잔액 차감
    data.credit.history.push({
      // 거래 내역 추가
      type: "use", // 타입: 사용
      amount,
      date: new Date().toISOString(),
    });
    saveData(data); // 변경된 데이터 저장
    return true; // 사용 성공
  } else {
    alert("크레딧이 부족합니다!"); // 잔액 부족 알림
    return false; // 사용 실패
  }
}
