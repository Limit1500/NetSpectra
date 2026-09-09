import { useSearchParams } from "next/navigation";
import { EmailTokenPurpose } from "./types";
import { useState } from "react";
import { deleteUser, getUser, patchUser } from "../../features/confirm/api";
import { useRouter } from "next/navigation";

export default function useConfirm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const purpose = searchParams.get("purpose") as EmailTokenPurpose;
  const token = searchParams.get("token");

  console.log(purpose);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [apiMessage, setApiMessage] = useState<string>("");

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
    const { user, status } = await getUser();

    if (status === 401) {
      router.push("/auth");
      return;
    }

    const { username, email } = user;

    setUsername(username);
    setEmail(email);

    console.log(username);
    console.log(email);
  }

  async function handlePatch() {
    const { message } = await patchUser(
      token as string,
      username,
      password,
      email,
    );

    setApiMessage(message);

    setTimeout(() => {
      setApiMessage("");
      if (message === "User patched successfully") {
        router.push("/user");
      }
    }, 3000);
  }

  async function handleDelete() {
    const { message } = await deleteUser(token as string);

    setApiMessage(message);

    setTimeout(() => {
      setApiMessage("");
      if (message === "User deleted successfully") {
        router.push("/auth");
      }
    }, 3000);
  }

  return {
    apiMessage,
    token,
    handleDelete,
    handlePatch,
    purpose,
    getSavedCredentials,
    handleEmail,
    handlePassword,
    handleUsername,
    username,
    password,
    email,
  };
}
