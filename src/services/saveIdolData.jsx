import axios from "axios";

const instance = axios.create({
  baseURL: "https://fandom-k-api.vercel.app/16-1",
  timeout: 3000,
});

export async function updateIdol(id, idolData) {
  const response = await instance.put(`/idols/${id}`, idolData);
  return response.data;
}

export async function addVote(idolId) {
  const response = await instance.post("/votes", { idolId: idolId });
  return response.data;
}

export async function donateToIdol(idolId, amount) {
  const response = await instance.put(`/donations/${idolId}/contribute`, {
    amount: amount,
  });
  return response.data;
}
