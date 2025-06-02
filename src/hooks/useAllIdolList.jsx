import { useState, useEffect } from "react";
import axios from "axios";

const knownGroups = ["아이브", "뉴진스", "르세라핌", "블랙핑크", "라이즈"]; // 추정 그룹 목록

function useAllIdolList(limit = 100) {
  const [allIdols, setAllIdols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGroups = async () => {
      setLoading(true);
      try {
        // map매소드를 사용해서 5개의 비동기 발생 Promise.all를 사용해서 여러개의 비동기요청을 병렬로 실행, 모든 데이터를 가져오면 한번에 결과 반환
        const results = await Promise.all(
          knownGroups.map((group) =>
            axios.get(`https://fandom-k-api.vercel.app/${group}/idols`, {
              params: { cursor: null, limit }, //어디서부터(cursor) 가져올지 판단 + 데이터를 몇 개(limit) 가져올지 판단
            })
          )
        );

        // flatMap 모든 그룹의 list를 하나로 합치고 한꺼풀 벗기기 + 비동기 작업과 분리해야함
        const merged = results.flatMap((res) => res.data.list);
        setAllIdols(merged);
      } catch (err) {
        console.error("전체 아이돌 데이터 불러오기 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGroups();
  }, [limit]);

  return { allIdols, loading, error };
}

export default useAllIdolList;
