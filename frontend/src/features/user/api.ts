import { EmailTokenPurpose } from "@/src/features/confirm/types";
import { API_URL } from "@/src/lib/config";

export async function askUpdateUser(purpose: EmailTokenPurpose) {
  return await fetch(`${API_URL}/user/me`, {
    method: purpose.toUpperCase(),
    credentials: "include",
  });
}

export async function logout() {
  fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
