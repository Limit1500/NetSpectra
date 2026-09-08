import { useContext, useState } from "react";
import { fetchDevices } from "./api";
import sortDevices from "./sortDevices";
import { DeviceProps, SortMethods } from "./types";
import { AppContext } from "@/src/context/AppContext";

export function useDevices() {
  const [devices, setDevices] = useState<DeviceProps[]>([]);
  const [sortBy, setSortBy] = useState<SortMethods>(SortMethods.byLastSeen);
  const [inputValue, setInputValue] = useState<string>("highest");
  const [apply, setApply] = useState(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const { username, setUsername } = useContext(AppContext);

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
    setIsBuffering(false);
  };

  function toggleApply() {
    setApply((current) => !current);
  }
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as SortMethods);
    setInputValue("");
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setInputValue(event.target.value);
  }

  function handleApplyKey(event: KeyboardEvent) {
    if (event.key === "Enter") {
      toggleApply();
    }
  }

  return {
    handleApplyKey,
    isBuffering,
    handleSortChange,
    handleInputChange,
    toggleApply,
    loadDevices,
    devices,
    sortBy,
    apply,
    inputValue,
    username,
  };
}
