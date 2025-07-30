"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  fullWidth,
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-xl text-sm sm:text-base font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white",
    secondary: "bg-white text-indigo-600",
    danger: "bg-red-500 text-white",
    outline: "border border-white/20 text-white",
  };

  const finalClassName = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  return (
    <button
      className={finalClassName}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
