export enum DeviceType {
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

export type MatchOperator = "EQUALS" | "CONTAINS" | "STARTS_WITH" | "ENDS_WITH";
