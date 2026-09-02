import { InputTypes } from "../types";

export function Input({
  type,
  onChange,
}: {
  type: InputTypes;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const inputStyle =
    "rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500";

  let minLength;
  let maxLength;

  if (type === InputTypes.username) {
    minLength = 3;
    maxLength = 30;
  } else if (type === InputTypes.password) {
    minLength = 8;
    maxLength = 128;
  } else {
    minLength = 3;
    maxLength = 254;
  }

  const htmlType = type === InputTypes.username ? "text" : type;

  return (
    <input
      type={htmlType}
      placeholder={type}
      name={type}
      id={type}
      autoComplete={type}
      required
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      className={inputStyle}
    />
  );
}
