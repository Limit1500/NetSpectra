import { getUser } from "@/src/features/confirm/api";
import { useEffect, useState } from "react";
import { askUpdateUser, logout } from "./api";
import { EmailTokenPurpose } from "@/src/features/confirm/types";
import { useRouter } from "next/navigation";

export default function useUser() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const router = useRouter();

  async function loadUser() {
    const { user, status } = await getUser();

    if (status === 401 || status === 404) {
      router.push("/auth");
      return;
    }

    setUsername(user.username);
    setEmail(user.email);
    setCreatedAt(user.createdAt);
    setUpdatedAt(user.updatedAt);
  }

  async function handlePatch() {
    const { message } = await askUpdateUser(EmailTokenPurpose.patch);
    setStatusMessage(message);

    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  }

  async function handleDelete() {
    const { message } = await askUpdateUser(EmailTokenPurpose.delete);
    setStatusMessage(message);

    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  }

  async function handleLogout() {
    const { message } = await logout();

    setStatusMessage(message);

    setTimeout(async () => {
      router.push("/auth");
      setStatusMessage("");
    }, 3000);
    return;
  }

  function goToDevices() {
    router.push("/devices");
  }

  useEffect(() => {
    const load = async () => {
      await loadUser();
    };

    load();
  }, []);

  return {
    statusMessage,
    goToDevices,
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
