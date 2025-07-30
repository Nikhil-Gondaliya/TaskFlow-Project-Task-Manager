import { HttpStatus } from "@/constants/httpStatus";
import sequelize from "@/lib/db";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { name, description } = await req.json();

  try {
    await sequelize.authenticate();
    const project = await Project.findByPk(id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: HttpStatus.NotFound },
      );
    }

    project.set({ name, description });
    await project.save();

    return NextResponse.json(
      { message: "Project updated", project },
      { status: HttpStatus.Ok },
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: HttpStatus.InternalServerError },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await sequelize.authenticate();
    const project = await Project.findByPk(id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: HttpStatus.NotFound },
      );
    }

    await project.destroy();
    return NextResponse.json(
      { message: "Project deleted" },
      { status: HttpStatus.Ok },
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: HttpStatus.InternalServerError },
    );
  }
}
