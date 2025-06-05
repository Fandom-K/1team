import axios from "axios";

const instance = axios.create({
  baseURL: "https://fandom-k-api.vercel.app/16-1",
  timeout: 3000,
});

export async function updateIdol(id, idolData) {
  const response = await instance.put(`/idols/${id}`, idolData);
  return response.data;
}
