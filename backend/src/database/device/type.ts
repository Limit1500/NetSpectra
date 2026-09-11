export interface DatabaseDeviceType {
  id: number;
  macAddress: string;
  vendor: string;
  deviceType: DeviceTypes;

  confidence: number;
  updates: number;

  lastSeen: Date;
  firstSeen: Date;
  lastDecay: Date;

  Phone: number;
  Tablet: number;
  Laptop: number;
  Desktop: number;
  SmartTv: number;
  StreamingDevice: number;
  GameConsole: number;
  Router: number;
  AccessPoint: number;
  Switch: number;
  Printer: number;
  Scanner: number;
  Camera: number;
  SmartSpeaker: number;
  Iot: number;
  Nas: number;
  Server: number;
  Industrial: number;
  Gateway: number;
  Unknown: number;
}

export enum DeviceTypes {
  Phone = "Phone",
  Tablet = "Tablet",
  Laptop = "Laptop",
  Desktop = "Desktop",

  SmartTV = "SmartTV",
  StreamingDevice = "StreamingDevice",
  GameConsole = "GameConsole",

  Router = "Router",
  AccessPoint = "AccessPoint",
  Switch = "Switch",

  Printer = "Printer",
  Scanner = "Scanner",

  Camera = "Camera",
  SmartSpeaker = "SmartSpeaker",

  Iot = "Iot",
  Nas = "Nas",
  Server = "Server",

  Industrial = "Industrial",
  Gateway = "Gateway",

  Unknown = "Unknown",
}
