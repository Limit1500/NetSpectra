import { EmailTokenPurpose } from "@/src/features/confirm/types";
import { API_URL } from "@/src/lib/config";

export async function askUpdateUser(purpose: EmailTokenPurpose) {
  const response = await fetch(`${API_URL}/user/me`, {
    method: purpose.toUpperCase(),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return data;
}
