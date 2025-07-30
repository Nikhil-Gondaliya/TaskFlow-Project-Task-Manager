"use client";
import RegisterForm from "@/component/AuthComponents/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4">
      <div className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
        <RegisterForm />
      </div>
    </div>
  );
}
