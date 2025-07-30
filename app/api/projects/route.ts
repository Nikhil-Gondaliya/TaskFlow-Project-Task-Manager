import { NextResponse } from "next/server";
import Project from "@/models/Project";
import sequelize from "@/lib/db";
import { HttpStatus } from "@/constants/httpStatus";

export async function POST(req: Request) {
  const { name, description } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "Project name is required" },
      { status: HttpStatus.BadRequest },
    );
  }

  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });

    const project = await Project.create({ name, description });
    return NextResponse.json(
      { message: "Project created", project },
      { status: HttpStatus.Created },
    );
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: HttpStatus.InternalServerError },
    );
  }
}

export async function GET() {
  try {
    await sequelize.authenticate();
    const projects = await Project.findAll();

    return NextResponse.json(projects, { status: HttpStatus.Ok });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: HttpStatus.InternalServerError },
    );
  }
}
