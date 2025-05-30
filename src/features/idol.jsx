import { loadData, saveData } from "../utils/storage.js";

/**
 * 아이돌을 배열에 추가하거나 제거하는 함수
 * @param {string} idolName - 선택하거나 해제할 아이돌 이름
 */

export function toggleIdolSelection(idolId) {
  const data = loadData();

  // 배열이 없으면 초기화 (안전장치
  if (!Array.isArray(data.selectedIdols)) {
    data.selectedIdols = [];
  }

  const index = data.selectedIdols.indexOf(idolId);
  if (index === -1) {
    // 없으면 추가
    data.selectedIdols.push(idolId);
  } else {
    // 있으면 제거 (선택 해제)
    data.selectedIdols.splice(index, 1);
  }

  saveData(data);
}
