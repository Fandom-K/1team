import { createContext, useContext } from "react";

const SizeContext = createContext(70); // 기본값 70px
/**
 * 원형 IdolProfile에 사이즈 전달용 컨텍스트
 * size={}
 **/
export const SizeProvider = ({ size, children }) => (
  <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
);

export const useSize = () => useContext(SizeContext);
