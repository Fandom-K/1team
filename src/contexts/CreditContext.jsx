import { createContext, useState } from "react";
import { getMyCredit } from "../utils/getStorage";

const CreditContext = createContext();

export const CreditProvider = ({ children }) => {
  const [credit, setCredit] = useState(getMyCredit());

  const updateCredit = (newCredit) => {
    setCredit(newCredit);
  };

  return (
    <CreditContext.Provider value={{ credit, updateCredit }}>
      {children}
    </CreditContext.Provider>
  );
};

export default CreditContext;
