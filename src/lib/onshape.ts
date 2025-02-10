import axios from "axios";

const ON_SHAPE_API = "https://cad.onshape.com/api/users"; // Base API URL for Onshape user data

export async function fetchOnshapeUser(accessToken: string) {
  const response = await axios.get(ON_SHAPE_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Attach the access token in the Authorization header
    },
  });
  return response.data; // Return the retrieved user data
}
