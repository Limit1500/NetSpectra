import { API_URL } from "@/src/lib/config";

export async function getUser() {
  const data = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });

  return data.json();
}

export async function deleteUser(token: string) {
  return await fetch(`${API_URL}/user/verify/${token}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function patchUser(
  token: string,
  username: string,
  password: string,
  email: string
) {
  return await fetch(`${API_URL}/user/verify/${token}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });
}
