// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import sequelize from "@/lib/db";
import { HttpStatus } from "@/constants/httpStatus";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: HttpStatus.BadRequest },
    );
  }

  try {
    await sequelize.authenticate();

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: HttpStatus.Forbidden },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: HttpStatus.Created },
    );
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: HttpStatus.InternalServerError },
    );
  }
}
