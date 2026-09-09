import { API_URL } from "@/src/lib/config";

export async function getUser() {
  const response = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    credentials: "include",
  });
  const user = await response.json();

  return { user, status: response.status };
}

export async function deleteUser(token: string) {
  const response = await fetch(`${API_URL}/user/verify/${token}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function patchUser(
  token: string,
  username: string,
  password: string,
  email: string,
) {
  const response = await fetch(`${API_URL}/user/verify/${token}`, {
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

  const data = response.json();

  return data;
}
