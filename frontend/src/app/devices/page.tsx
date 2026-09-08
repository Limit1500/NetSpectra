"use client";

import { useContext, useEffect } from "react";
import { useDevices } from "../../features/devices/useDevices";
import { Navigation } from "../../features/devices/components/Navigation";
import { DevicesTable } from "@/src/features/devices/components/DevicesTable";
import { SearchContainer } from "@/src/features/devices/components/SearchContainer";
import { AppContext } from "@/src/context/AppContext";
import Loading from "../../components/Loading";

export default function Devices() {
  const {
    loadDevices,
    devices,
    apply,
    sortBy,
    inputValue,
    isBuffering,
    toggleApply,
    handleSortChange,
    handleInputChange,
    handleApplyKey,
  } = useDevices();

  const { username, setUsername } = useContext(AppContext);

  useEffect(() => {
    loadDevices();
  }, [apply]);

  useEffect(() => {
    document.addEventListener("keydown", handleApplyKey);

    return () => {
      document.removeEventListener("keydown", handleApplyKey);
    };
  });

  return isBuffering ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

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
