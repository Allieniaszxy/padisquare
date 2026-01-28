import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "w-full px-3 py-2 border rounded-md text-sm",
        "focus:outline-none focus:ring-2 focus:ring-brand",
        className,
      )}
      {...props}
    />
  );
}
