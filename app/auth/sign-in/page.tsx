import AuthForm from "@/component/AuthComponents/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4 py-8">
      <div className="relative w-full max-w-md sm:p-8 p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-tight drop-shadow-md">
          Welcome back
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
