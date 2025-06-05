// 로컬스토리지에 사용할 키 값 정의
const STORAGE_KEY = "FandomKData";

/**
 * 로컬스토리지에서 데이터 불러오기
 * 데이터가 없으면 초기값으로 반환
 */
export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);

  try {
    const parsed = raw ? JSON.parse(raw) : null;

    // 마이그레이션: 기존 selectedIdols → interestedIdols
    if (parsed?.selectedIdols && !parsed.interestedIdols) {
      parsed.interestedIdols = parsed.selectedIdols;
      delete parsed.selectedIdols;
    }

    return (
      parsed || {
        interestedIdols: [],
        credit: {
          balance: 5000,
          history: [],
        },
      }
    );
  } catch (e) {
    console.warn("로컬스토리지 데이터 파싱 실패:", e);
    return {
      interestedIdols: [],
      credit: {
        balance: 5000,
        history: [],
      },
    };
  }
}

/**
 * 로컬스토리지에 데이터 저장하기
 * 객체를 JSON 문자열로 바꿔서 저장함
 */
export function saveData(data) {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (e) {
    console.error("로컬스토리지 저장 실패:", e);
    return { success: false, error: e };
  }
}

// 사용예시
// const result = saveData(myData);
//
// if (result.success) {
//   console.log("저장에 성공했습니다!");
// } else {
//   console.warn("저장에 실패했습니다:", result.error.message);
//   alert("저장 중 오류가 발생했습니다: " + result.error.message);
// }
