import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import sequelize from "@/lib/db";
import { HttpStatus } from "@/constants/httpStatus";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: HttpStatus.BadRequest },
    );
  }

  if (!JWT_SECRET) {
    return NextResponse.json(
      { error: "JWT_SECRET not set" },
      { status: HttpStatus.InternalServerError },
    );
  }

  try {
    await sequelize.authenticate();

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: HttpStatus.Unauthorized },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: HttpStatus.Unauthorized },
      );
    }

    const payload = {
      id: user.get("id"),
      name: user.get("name"),
      email: user.get("email"),
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    return NextResponse.json(
      { message: "Login successful", token, user: payload },
      { status: HttpStatus.Ok },
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: HttpStatus.InternalServerError },
    );
  }
}
