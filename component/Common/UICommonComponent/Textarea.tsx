"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextareaProps = {
  label?: string;
  placeholder?: string;
  rows?: number;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
};

export default function Textarea({
  label,
  placeholder,
  rows = 3,
  register,
  error,
  className = "",
}: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-white text-sm">{label}</label>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        {...register}
        className={`w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}
