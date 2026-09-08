import { API_URL } from "@/src/lib/config";
import { DeviceProps } from "./types";

type FetchDevicesResponse = {
  data: DeviceProps[];
  status: number;
};

export async function fetchDevices(): Promise<FetchDevicesResponse> {
  const response = await fetch(`${API_URL}/devices`, {
    credentials: "include",
  });

  const data = await response.json();

  return {
    data,
    status: response.status,
  };
}
