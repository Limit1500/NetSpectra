export function normalizeHostname(hostname: string): string {
  return hostname
    .trim()
    .toLowerCase()
    .replace(/\.$/, "")
    .replace(/[_\s]+/g, "-");
}

export function normalizeVendor(vendor: string): string {
  return vendor
    .trim()
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/[_\s-]+/g, " ");
}
