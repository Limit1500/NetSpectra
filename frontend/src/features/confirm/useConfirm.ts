import { useSearchParams } from "next/navigation";
import { EmailTokenPurpose, UserData } from "./types";
import { useState } from "react";
import { deleteUser, getUser, patchUser } from "../../features/confirm/api";

export default function useConfirm() {
  const searchParams = useSearchParams();

  const purpose = searchParams.get("purpose") as EmailTokenPurpose;
  const token = searchParams.get("token");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function getSavedCredentials() {
    const { username, email } = (await getUser()) as UserData;
    setUsername(username);
    setEmail(email);
  }

  async function handlePatch() {
    await patchUser(token as string, username, password, email);
  }

  async function handleDelete() {
    await deleteUser(token as string);
  }

  return {
    token,
    handleDelete,
    handlePatch,
    purpose,
    getSavedCredentials,
    handleEmail,
    handlePassword,
    handleUsername,
  };
}
