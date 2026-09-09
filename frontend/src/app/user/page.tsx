"use client";

import useUser from "../../features/user/useUser";

export default function User() {
  const {
    handleDelete,
    handlePatch,
    username,
    email,
    createdAt,
    updatedAt,
    handleLogout,
    goToDevices,
    statusMessage,
  } = useUser();

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      {" "}
      <div className="mx-auto w-full max-w-5xl">
        {" "}
        {/* Header */}{" "}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 ring-1 ring-blue-500/20">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Profile
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your account and personal information
                </p>
              </div>
            </div>

            <button
              onClick={goToDevices}
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              Devices
            </button>
          </div>
        </div>
        {/* Main account card */}{" "}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
          {" "}
          {/* Card header */}{" "}
          <div className="border-b border-slate-800 px-7 py-6">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <h2 className="text-lg font-semibold text-white">
                  {" "}
                  Account information{" "}
                </h2>{" "}
                <p className="mt-1 text-sm text-slate-400">
                  {" "}
                  Your account details and activity information{" "}
                </p>{" "}
              </div>{" "}
              <div className="hidden rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 sm:block">
                {" "}
                Account active{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Information */}{" "}
          <div className="px-7 py-7">
            {" "}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {" "}
              {/* Username */}{" "}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                {" "}
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {" "}
                  Username{" "}
                </p>{" "}
                <p className="mt-2 text-base font-medium text-white">
                  {" "}
                  {username}{" "}
                </p>{" "}
              </div>{" "}
              {/* Email */}{" "}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                {" "}
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {" "}
                  Email address{" "}
                </p>{" "}
                <p className="mt-2 break-all text-base font-medium text-white">
                  {" "}
                  {email}{" "}
                </p>{" "}
              </div>{" "}
              {/* Created */}{" "}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                {" "}
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {" "}
                  Account created{" "}
                </p>{" "}
                <p className="mt-2 text-sm font-medium text-slate-200">
                  {" "}
                  {createdAt?.toLocaleString()}{" "}
                </p>{" "}
              </div>{" "}
              {/* Updated */}{" "}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                {" "}
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {" "}
                  Last updated{" "}
                </p>{" "}
                <p className="mt-2 text-sm font-medium text-slate-200">
                  {" "}
                  {updatedAt?.toLocaleString()}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {/* Modify */}{" "}
            <div className="mt-7 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-5 py-4">
              {" "}
              <div>
                {" "}
                <p className="text-sm font-medium text-slate-200">
                  {" "}
                  Account details{" "}
                </p>{" "}
                <p className="mt-1 text-xs text-slate-500">
                  {" "}
                  Change your username or email address{" "}
                </p>{" "}
              </div>{" "}
              <button
                onClick={handlePatch}
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 active:scale-[0.98]"
              >
                {" "}
                Modify data{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        {/* Session */}{" "}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          {" "}
          <div className="flex items-center justify-between gap-6">
            {" "}
            <div>
              {" "}
              <h2 className="text-base font-semibold text-white">
                {" "}
                Session{" "}
              </h2>{" "}
              <p className="mt-1 text-sm text-slate-400">
                {" "}
                Sign out of your current session on this device{" "}
              </p>{" "}
            </div>{" "}
            <button
              onClick={handleLogout}
              type="button"
              className="shrink-0 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white active:scale-[0.98]"
            >
              {" "}
              Log out{" "}
            </button>{" "}
          </div>{" "}
        </section>{" "}
        {/* Danger zone */}{" "}
        <section className="mt-6 overflow-hidden rounded-2xl border border-red-900/70 bg-red-950/10">
          {" "}
          <div className="border-b border-red-900/60 px-7 py-6">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                {" "}
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.73-3.14l-8.18-14a2 2 0 0 0-3.44 0Z"
                  />{" "}
                </svg>{" "}
              </div>{" "}
              <div>
                {" "}
                <h2 className="text-base font-semibold text-red-300">
                  {" "}
                  Danger zone{" "}
                </h2>{" "}
                <p className="mt-1 text-sm text-red-400/70">
                  {" "}
                  Irreversible account actions{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-col gap-5 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-slate-200">
                {" "}
                Delete account{" "}
              </p>{" "}
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                {" "}
                Permanently delete your account and all associated data. This
                action cannot be undone.{" "}
              </p>{" "}
            </div>{" "}
            <button
              onClick={handleDelete}
              type="button"
              className="shrink-0 rounded-lg border border-red-800 bg-red-950/50 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-700 hover:bg-red-900/50 hover:text-red-300 active:scale-[0.98]"
            >
              {" "}
              Delete account{" "}
            </button>{" "}
          </div>{" "}
        </section>{" "}
        {statusMessage === "" ? (
          <></>
        ) : (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            flex items-center gap-3 rounded-lg border
            bg-slate-900 px-5 py-3 shadow-xl"
          >
            <span className="text-lg">✉️</span>

            <div>
              <p className="text-sm text-slate-400">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
}
