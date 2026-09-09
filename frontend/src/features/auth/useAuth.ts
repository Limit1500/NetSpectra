import { useContext, useState } from "react";
import { authentificate } from "./api";
import { useRouter } from "next/navigation";
import { AuthType } from "./types";
import { AppContext } from "@/src/context/AppContext";

export function useAuth() {
  const { username, setUsername } = useContext(AppContext);
  const [authType, setAuthType] = useState<AuthType>(AuthType.login);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [rememberUser, setRememberUser] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const router = useRouter();

  async function handleAuthentification() {
    setIsBuffering(true);

    const data = await authentificate(
      authType,
      username,
      password,
      email,
      rememberUser,
    );
    setServerMessage(data.message);

    if (data.message === "Signin successful") {
      setTimeout(() => {
        setAuthType(AuthType.login);
        setServerMessage("");
      }, 1000);
    } else if (data.message === "Login successful") {
      setTimeout(() => {
        setUsername(data.username);
        router.push("/devices");
        setServerMessage("");
      }, 1000);
    }
    setIsBuffering(false);
  }

  function toggleAuthType() {
    setAuthType(
      authType === AuthType.signin ? AuthType.login : AuthType.signin,
    );
  }

  function toggleRememberUser() {
    setRememberUser(rememberUser === true ? false : true);
  }

  function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return {
    isBuffering,
    toggleRememberUser,
    handleUsername,
    handlePassword,
    handleEmail,
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
