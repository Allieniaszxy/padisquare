import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md text-sm font-medium transition",
        variant === "primary" && "bg-brand text-white hover:bg-green-700",
        variant === "outline" &&
          "border border-brand text-brand hover:bg-green-50",
        className,
      )}
      {...props}
    />
  );
}
