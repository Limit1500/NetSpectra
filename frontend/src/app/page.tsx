import Logo from "../components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />

          <Link
            href="/auth"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
          >
            Log in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6">
        <section className="flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            Network monitoring platform
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Monitor your network.
            <span className="block text-blue-500">
              Understand your devices.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            NetSpectra helps you monitor devices connected to your network and
            understand what is happening across your infrastructure.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/devices"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Get started
            </Link>

            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-5 py-3 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Network online
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid w-full max-w-5xl gap-5 pb-24 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              ◉
            </div>

            <h2 className="text-lg font-semibold">Device discovery</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Automatically detect devices connected to your network.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              ◇
            </div>

            <h2 className="text-lg font-semibold">Device identification</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Analyze network information to determine the type of connected
              devices.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              ↗
            </div>

            <h2 className="text-lg font-semibold">Network insights</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Get a clear overview of the devices and activity within your
              network.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
