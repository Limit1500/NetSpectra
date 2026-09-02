import { SortMethods } from "./types";
import { DeviceProps } from "./types";

type StringDeviceProperty = {
  [K in keyof DeviceProps]: DeviceProps[K] extends string ? K : never;
}[keyof DeviceProps];

export default function sortDevices(
  allDevices: DeviceProps[],
  method: SortMethods,
  valueInput: string
): DeviceProps[] {
  const direction = valueInput === "highest" ? 1 : -1;
  if (
    method === SortMethods.byDeviceType ||
    method === SortMethods.byMacAddress ||
    method === SortMethods.byVendor
  ) {
    const property = method
      .replace(/^by/, "")
      .replace(/^./, (char) => char.toLowerCase()) as StringDeviceProperty;

    return [...allDevices].filter((device) => {
      return device[property]
        .toLowerCase()
        .startsWith(valueInput.toLowerCase());
    });
  } else {
    let first: number;
    let second: number;

    return [...allDevices].sort((a, b) => {
      let first: number;
      let second: number;

      if (method === SortMethods.byLastSeen) {
        first = a.lastSeen.getTime();
        second = b.lastSeen.getTime();
      } else if (method === SortMethods.byFirstSeen) {
        first = a.firstSeen.getTime();
        second = b.firstSeen.getTime();
      } else {
        first = a.updates;
        second = b.updates;
      }

      return (first - second) * direction;
    });
  }
}
