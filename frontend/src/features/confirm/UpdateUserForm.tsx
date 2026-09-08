import { Input } from "@/src/components/Input";
import { InputTypes } from "@/src/features/auth/types";
import useConfirm from "./useConfirm";
import { useEffect } from "react";
import { EmailTokenPurpose } from "./types";

export default function UpdateUserForm() {
  const {
    handleUsername,
    handleEmail,
    handlePassword,
    getSavedCredentials,
    purpose,
    handleDelete,
    handlePatch,
    token,
  } = useConfirm();

  useEffect(() => {
    if (purpose === EmailTokenPurpose.patch) {
      getSavedCredentials();
    }
  }, []);

  if (purpose === EmailTokenPurpose.delete && token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-red-500/20">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.3 3.8 2.9 18a2 2 0 0 0 1.8 3h14.6a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-slate-100">
                  Delete your account
                </h2>

                <p className="text-sm text-slate-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="mb-6 text-sm leading-6 text-slate-400">
              Your account and associated personal information will be
              permanently deleted. Make sure you really want to continue.
            </p>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Confirm account deletion
            </button>
          </div>
        </div>
      </div>
    );
  } else if (purpose === EmailTokenPurpose.patch && token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-800 px-7 py-6">
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
                    d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-1.8 1.8-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.5V20h-2.55v-.09a1.65 1.65 0 0 0-1-1.5 1.65 1.65 0 0 0-1.82.33l-.06.06-1.8-1.8.06-.06A1.65 1.65 0 0 0 8.3 15a1.65 1.65 0 0 0-1.5-1H6.7v-2.55h.1a1.65 1.65 0 0 0 1.5-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 1.8-1.8.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.5V5h2.55v.09a1.65 1.65 0 0 0 1 1.5 1.65 1.65 0 0 0 1.82-.33l.06-.06 1.8 1.8-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.5 1h.1V14h-.09a1.65 1.65 0 0 0-1.5 1Z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                  Update your account
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Keep your account information up to date.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5 px-7 py-7">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                Account information
              </p>

              <div className="space-y-4">
                <Input type={InputTypes.username} onChange={handleUsername} />

                <Input type={InputTypes.password} onChange={handlePassword} />

                <Input type={InputTypes.email} onChange={handleEmail} />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={handlePatch}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Invalid confirmation link</div>;
  }
}
