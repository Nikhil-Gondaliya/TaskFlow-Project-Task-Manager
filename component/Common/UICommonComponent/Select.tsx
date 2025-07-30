"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  register: UseFormRegisterReturn;
  options: Option[];
  error?: FieldError;
  className?: string;
};

export default function Select({
  label,
  register,
  options,
  error,
  className = "",
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-white text-sm">{label}</label>}
      <select
        {...register}
        className={`w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}
