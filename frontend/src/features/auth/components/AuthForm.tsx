import { useAuth } from "../authLogic";
import { InputTypes } from "../types";
import { Input } from "./Input";

export function AuthForm() {
  const {
    handleAuthentification,
    toggleAuthType,
    authType,
    setUsername,
    setPassword,
    setEmail,
    serverMessage,
  } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Authentification</h1>

          <p className="mt-2 text-sm text-slate-400">
            {authType === "signin"
              ? "Create your NetSpectra account"
              : "Log in to your NetSpectra account"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type={InputTypes.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type={InputTypes.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {authType === "signin" ? (
            <Input
              type={InputTypes.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <></>
          )}

          <p
            className={` mt-2 text-sm ${
              serverMessage === "Signin successful" ||
              serverMessage === "Login successful"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {serverMessage}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleAuthentification}
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            {authType === "signin" ? "Create account" : "Log in"}
          </button>
          <button
            onClick={toggleAuthType}
            className="text-sm text-blue-400 transition hover:text-blue-300"
          >
            {authType === "signin" ? "login" : "signin"}
          </button>
        </div>
      </div>
    </div>
  );
}
