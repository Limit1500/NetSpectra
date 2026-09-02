import { API_URL } from "@/src/lib/config";
import { AuthType } from "./types";

export async function authentificate(
  type: AuthType,
  username: string,
  password: string,
  email: string
) {
  const response = await fetch(`${API_URL + "/auth/"}${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
      ...(type === "signin" && { email }),
    }),
  });
  const data = await response.json();

  return data;
}
