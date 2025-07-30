"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react";
import { emailRegex } from "@/utils/regex";
import FormInput from "../Common/UICommonComponent/Input";
import Button from "../Common/UICommonComponent/Button";

// Schema for registration
const registerSchema = z
  .object({
    name: z.string().min(1, "This is a mandatory field"),
    email: z
      .string()
      .trim()
      .regex(emailRegex, "Email is invalid")
      .refine((val) => !!val, {
        message: "This is a mandatory field",
      }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine((val) => !!val, {
        message: "This is a mandatory field",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Something went wrong");
        return;
      }

      alert("Registered successfully!");
      router.push("/auth/sign-in");
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        type="text"
        placeholder="name"
        register={register("name")}
        error={errors.name}
        icon={<User className=" text-indigo-400" size={20} />}
      />

      <FormInput
        type="email"
        placeholder="Email address"
        register={register("email")}
        error={errors.email}
        icon={<Mail className=" text-indigo-400" size={20} />}
      />

      <FormInput
        placeholder="Enter password"
        type="password"
        register={register("password")}
        error={errors.password}
        icon={<Lock size={20} className=" text-indigo-400" />}
      />

      <FormInput
        placeholder="Confirm Password"
        register={register("confirmPassword")}
        type="password"
        error={errors.password}
        icon={<Lock size={20} className=" text-indigo-400" />}
      />

      <Button type="submit" className="w-full" loading={loading}>
        Register
      </Button>

      <p className="text-center text-sm text-indigo-300">
        Already have an account?{" "}
        <a
          onClick={() => router.push("/auth/sign-in")}
          className="text-indigo-100 hover:underline"
        >
          Sign In
        </a>
      </p>
    </form>
  );
}
