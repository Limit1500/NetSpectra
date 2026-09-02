import { DeviceProps } from "./types";

type FetchDevicesResponse = {
  data: DeviceProps[];
  status: number;
};

export async function fetchDevices(): Promise<FetchDevicesResponse> {
  const response = await fetch("http://localhost:3456/devices", {
    credentials: "include",
  });

  const data = await response.json();

  return {
    data,
    status: response.status,
  };
}

export async function logout() {
  fetch("http://localhost:3456/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
