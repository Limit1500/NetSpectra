import { useState } from "react";
import { fetchDevices, logout } from "./api";
import sortDevices from "./sortDevices";
import { DeviceProps, SortMethods } from "./types";
import { User } from "@/src/features/auth/authLogic";

export function useDevices() {
  const [devices, setDevices] = useState<DeviceProps[]>([]);
  const [sortBy, setSortBy] = useState<SortMethods>(SortMethods.byLastSeen);
  const [inputValue, setInputValue] = useState<string>("highest");
  const [apply, setApply] = useState(false);
  const [username, setUsername] = useState(`${User}`);

  const loadDevices = async () => {
    const { data, status } = await fetchDevices();

    if (status === 401) {
      window.location.href = "/auth";
      return;
    }

    const devicesWithDates = data.map((device: DeviceProps) => ({
      ...device,
      firstSeen: new Date(device.firstSeen),
      lastSeen: new Date(device.lastSeen),
    }));

    const sortedDevices = sortDevices(devicesWithDates, sortBy, inputValue);

    setDevices(sortedDevices);
  };

  function handleLogout() {
    logout();
    window.location.href = "/auth";
    return;
  }

  function toggleApply() {
    setApply((current) => !current);
  }
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as SortMethods);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setInputValue(event.target.value);
  }

  return {
    handleSortChange,
    handleInputChange,
    toggleApply,
    handleLogout,
    loadDevices,
    devices,
    sortBy,
    apply,
    inputValue,
    username,
  };
}
