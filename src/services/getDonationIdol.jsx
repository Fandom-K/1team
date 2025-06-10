import axios from "axios";

export default async function getDonationIdol() {
  const response = await axios.get(
    `https://fandom-k-api.vercel.app/16-1/donations?pageSize=100`
  );
  return response.data.list;
}
