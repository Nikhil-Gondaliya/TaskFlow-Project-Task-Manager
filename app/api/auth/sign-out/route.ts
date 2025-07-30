import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" });

  response.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
