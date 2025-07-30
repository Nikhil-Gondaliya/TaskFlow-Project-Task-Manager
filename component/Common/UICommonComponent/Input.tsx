"use client";

import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type FormInputProps = {
  label?: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  icon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  label,
  placeholder,
  error,
  register,
  icon,
  type = "text",
  ...rest
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-sm text-white">{label}</label>}

      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
            {icon}
          </span>
        )}

        {/* Input Field */}
        <input
          {...register}
          {...rest}
          type={inputType}
          placeholder={placeholder}
          className={`w-full py-2 px-4 rounded-md bg-white/20 text-white placeholder-white/60 border text-sm sm:text-base transition-all duration-200
            ${error ? "border-red-500" : "border-white/20"}
            ${icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}`}
        />

        {/* Right Toggle Button for Password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-1"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-xs sm:text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
