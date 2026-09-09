import Logo from "@/src/components/Logo";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <button
          onClick={() => router.push("/user")}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
        >
          Profile
        </button>
      </div>
    </nav>
  );
}
