import { useState } from "react";
import { authentificate } from "./api";
import { useRouter } from "next/navigation";
import { AuthType } from "./types";

export let User = "";

export function useAuth() {
  const [authType, setAuthType] = useState<AuthType>(AuthType.login);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();

  async function handleAuthentification() {
    const data = await authentificate(authType, username, password, email);
    setServerMessage(data.message);

    if (data.message === "Signin successful") {
      setTimeout(() => {
        setAuthType(AuthType.login);
      }, 1000);
    } else if (data.message === "Login successful") {
      setTimeout(() => {
        User = username;
        router.push("/devices");
      }, 1000);
    }
  }

  function toggleAuthType() {
    setAuthType(
      authType === AuthType.signin ? AuthType.login : AuthType.signin
    );
  }

  return {
    handleAuthentification,
    toggleAuthType,
    authType,
    setAuthType,
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    serverMessage,
    setServerMessage,
  };
}
