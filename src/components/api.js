export async function getidols() {
  const response = await fetch(
    "https://fandom-k-api.vercel.app/아이브/idols?pageSize=10"
  );
  return await response.json();
}
