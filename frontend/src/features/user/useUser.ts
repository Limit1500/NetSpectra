import { getUser } from "@/src/features/confirm/api";
import { useEffect, useState } from "react";
import { askUpdateUser, logout } from "./api";
import { EmailTokenPurpose, UserData } from "@/src/features/confirm/types";

export default function useUser() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  async function loadUser() {
    const user = (await getUser()) as UserData;
    setUsername(user.username);
    setEmail(user.email);
    setCreatedAt(user.createdAt);
    setUpdatedAt(user.updatedAt);
  }

  function handlePatch() {
    askUpdateUser(EmailTokenPurpose.patch);
  }

  function handleDelete() {
    askUpdateUser(EmailTokenPurpose.delete);
  }

  function handleLogout() {
    logout();
    window.location.href = "/auth";
    return;
  }

  useEffect(() => {
    loadUser();
  }, []);

  return {
    handleLogout,
    loadUser,
    username,
    email,
    updatedAt,
    createdAt,
    handleDelete,
    handlePatch,
  };
}
