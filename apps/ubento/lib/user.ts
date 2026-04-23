import axios from "axios";
import { getAccessToken } from "./auth";

export async function getUser() {
  const accessToken = await getAccessToken();
  if (!accessToken) return undefined;

  try {
    const { data } = await axios.get(
      `${process.env.AUTH_ISSUER_URL}/oauth/self`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return undefined;
  }
}
