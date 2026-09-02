import Device from "../device";
import { DeviceTableProps } from "../types";

export function DevicesTable({ devices }: DeviceTableProps) {
  const colHeaderStyle =
    "text-xs font-medium uppercase tracking-wider text-slate-500";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
      <div className="grid grid-cols-[1.2fr_1.5fr_2fr_1.3fr_1.3fr_0.8fr] items-center border-b border-slate-800 bg-slate-800/50 px-6 py-3">
        <span className={colHeaderStyle}>Device</span>

        <span className={colHeaderStyle}>Vendor</span>

        <span className={colHeaderStyle}>MAC Address</span>

        <span className={colHeaderStyle}>Last Seen</span>

        <span className={colHeaderStyle}>First Seen</span>

        <span className={colHeaderStyle}>Updates</span>
      </div>

      <div className="divide-y divide-slate-800">
        {devices.map((device) => (
          <Device
            key={device.macAddress}
            deviceType={device.deviceType}
            vendor={device.vendor}
            macAddress={device.macAddress}
            lastSeen={device.lastSeen}
            firstSeen={device.firstSeen}
            updates={device.updates}
          />
        ))}
      </div>

      {devices.length === 0 && (
        <div className="flex h-32 items-center justify-center text-sm text-slate-500">
          No devices detected
        </div>
      )}
    </div>
  );
}
