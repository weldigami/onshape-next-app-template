import axios from "axios";
export async function fetchOnshapeData(accessToken: string) {
  const response = await axios.get(`${process.env.ONSHAPE_API_URL}/documents`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}