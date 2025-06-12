import axios from "axios";

export default async function getIdols() {
  const response = await axios.get(
    `https://fandom-k-api.vercel.app/16-1/idols/?pageSize=100`
  );
  return response.data.list;
}
