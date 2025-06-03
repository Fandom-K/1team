import axios from "axios";

export default async function getIdol({ gender }) {
  const response = await axios.get(
    `https://fandom-k-api.vercel.app/16-1/idols/?pageSize=100`
  );
  return response.data.list.filter((idol) => idol.gender === gender);
}
