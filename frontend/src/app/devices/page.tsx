"use client";

import { useEffect } from "react";
import { useDevices } from "../../features/devices/useDevices";
import { Navigation } from "../../features/devices/components/Navigation";
import { DevicesTable } from "@/src/features/devices/components/DevicesTable";
import { SearchContainer } from "@/src/features/devices/components/SearchContainer";

export default function Devices() {
  const {
    handleLogout,
    loadDevices,
    devices,
    apply,
    username,
    sortBy,
    inputValue,
    toggleApply,
    handleSortChange,
    handleInputChange,
  } = useDevices();

  useEffect(() => {
    loadDevices();
  }, [apply]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation username={username} handleLogout={handleLogout} />
      <main className="mx-auto max-w-6xl px-6 pb-12 pt-24">
        <SearchContainer
          sortBy={sortBy}
          inputValue={inputValue}
          toggleApply={toggleApply}
          handleSortChange={handleSortChange}
          handleInputChange={handleInputChange}
        />
        <DevicesTable devices={devices} />
      </main>
    </div>
  );
}
