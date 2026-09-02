export enum SortMethods {
  byLastSeen = "byLastSeen",
  byFirstSeen = "byFirstSeen",
  byDeviceType = "byDeviceType",
  byUpdates = "byUpdates",
  byMacAddress = "byMacAddress",
  byVendor = "byVendor",
}

export type DeviceProps = {
  deviceType: string;
  vendor: string;
  macAddress: string;
  lastSeen: Date;
  firstSeen: Date;
  updates: number;
};

export type DeviceTableProps = {
  devices: DeviceProps[];
};
