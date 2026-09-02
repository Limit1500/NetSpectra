import { DeviceProps } from "./types";

export default function Device(DeviceData: DeviceProps) {
  const { deviceType, vendor, macAddress, lastSeen, firstSeen, updates } =
    DeviceData;

  return (
    <div className="group grid grid-cols-[1.2fr_1.5fr_2fr_1.3fr_1.3fr_0.8fr] items-center px-6 py-4 transition-colors duration-150 hover:bg-slate-800/40">
      <div>
        <span className="inline-flex rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
          {deviceType}
        </span>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-200">{vendor}</p>
      </div>

      <div>
        <p className="font-mono text-sm tracking-wide text-slate-400">
          {macAddress}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-300">
          {new Date(lastSeen).toLocaleDateString()}
        </p>
        <p className="mt-0.5 text-xs text-slate-600">
          {new Date(lastSeen).toLocaleTimeString()}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-300">
          {new Date(firstSeen).toLocaleDateString()}
        </p>
        <p className="mt-0.5 text-xs text-slate-600">
          {new Date(firstSeen).toLocaleTimeString()}
        </p>
      </div>

      <div className="text-right">
        <span className="font-mono text-sm font-semibold text-slate-300">
          {updates}
        </span>
      </div>
    </div>
  );
}
