"use client";

import Button from "@/component/Common/UICommonComponent/Button";
import ProjectList from "@/component/ProjectComponents/ProjectList";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/auth/sign-in");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[15px] sm:text-3xl font-bold">
            TaskFlow — Kanban Board
          </h1>

          <div className="block sm:hidden">
            <Button
              onClick={handleSignOut}
              className="h-[36px] text-sm px-4 py-1"
            >
              Sign Out
            </Button>
          </div>
        </div>

        <ProjectList />
      </div>

      <div className="hidden sm:flex items-start">
        <Button onClick={handleSignOut} className="h-[40px] w-[100px]">
          Sign Out
        </Button>
      </div>
    </main>
  );
}
