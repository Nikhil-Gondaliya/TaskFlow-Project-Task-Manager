"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { emailRegex } from "@/utils/regex";
import FormInput from "../Common/UICommonComponent/Input";
import Button from "../Common/UICommonComponent/Button";
import { useState } from "react";

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(emailRegex, "Email is invalid")
    .nullable()
    .refine((value) => !!value, {
      message: "This is a mandatory field",
    }),
  password: z
    .string()
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "This is a mandatory field",
    }),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function AuthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        type="email"
        placeholder="Email address"
        register={register("email")}
        error={errors.email}
        icon={<Mail size={20} />}
      />

      <FormInput
        placeholder="Enter password"
        type="password"
        register={register("password")}
        error={errors.password}
        icon={<Lock size={20} />}
      />

      <Button type="submit" className="w-full" loading={loading}>
        Sign In
      </Button>

      <p className="text-center text-sm text-indigo-300">
        Don’t have an account?{" "}
        <a
          onClick={() => router.push("/auth/register")}
          className="text-indigo-100 hover:underline cursor-pointer"
        >
          Register
        </a>
      </p>
    </form>
  );
}
