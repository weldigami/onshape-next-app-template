import axios from "axios";

const ON_SHAPE_API = "https://cad.onshape.com/api/users/sessioninfo";

export async function fetchOnshapeUser(accessToken: string) {
  const response = await axios.get(ON_SHAPE_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
