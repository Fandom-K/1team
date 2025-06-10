import axios from "axios";

export default async function getIdol() {
  const response = await axios.get(
    `https://fandom-k-api.vercel.app/16-1/idols/?pageSize=100`
  );
  return response.data.list;
}
// 필터따로 분리?
// 전체데이터
// 데이터가 많아졌을때 고려하면?
// 이름이
