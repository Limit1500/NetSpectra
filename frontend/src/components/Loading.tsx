"use client";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-slate-300" />
    </div>
  );
}
