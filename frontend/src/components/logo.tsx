import { Network } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 text-blue-400">
      <Network size={32} />
      <span className="text-xl font-bold">NetSpectra</span>
    </div>
  );
}
