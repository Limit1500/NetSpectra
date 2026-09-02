import Logo from "../components/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-center">
      <Logo />

      <p className="mt-4 text-lg text-slate-400">
        Network monitoring made simple
      </p>

      <Link href="/auth">
        <button className="mt-8 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500">
          Proceed
        </button>
      </Link>
    </div>
  );
}
