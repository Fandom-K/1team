// 로컬스토리지에 사용할 키 값 정의
const STORAGE_KEY = "FandomKData";

/**
 * 로컬스토리지에서 데이터 불러오기
 * 데이터가 없으면 초기값으로 반환
 */
export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);

  // 저장된 데이터가 있으면 JSON으로 변환해서 반환
  // 없으면 초기값을 반환
  return raw
    ? JSON.parse(raw)
    : {
        selectedIdols: [], // 선택한 아이돌 없음
        credit: {
          balance: 5000, // 잔액을 나타내는 부분, 기본 크레딧 5000 줌
          history: [], // 거래 내역 없음
        },
      };
}

/**
 * 로컬스토리지에 데이터 저장하기
 * 객체를 JSON 문자열로 바꿔서 저장함
 */
export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
