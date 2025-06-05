import { loadData } from "./storage";

const data = loadData();

export function getCreditData() {
  return data.credit;
}

export function getMyCredit() {
  return data.credit.balance;
}
