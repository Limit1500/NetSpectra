export function Navigation({
  username,
  handleLogout,
}: {
  username: string;
  handleLogout: () => void;
}) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            N
          </div>

          <span className="text-lg font-semibold tracking-tight">
            NetSpectra
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {username}
          <button
            onClick={handleLogout}
            className="
    rounded-md bg-red-600 px-4 py-2
    text-sm font-medium text-white
    transition-colors duration-200
    hover:bg-red-700
    active:bg-red-800
  "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
