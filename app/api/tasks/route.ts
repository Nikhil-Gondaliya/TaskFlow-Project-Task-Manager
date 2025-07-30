import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import { HttpStatus } from "@/constants/httpStatus";

export async function POST(req: NextRequest) {
  try {
    const { title, description, date, status, projectId } = await req.json();

    const task = await Task.create({
      title,
      description,
      date,
      status,
      projectId,
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error("Create Task Error:", err);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: HttpStatus.InternalServerError },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const projectId = req.nextUrl.searchParams.get("projectId");

    const where = projectId ? { projectId } : undefined;
    const tasks = await Task.findAll({ where });

    return NextResponse.json(tasks);
  } catch (err) {
    console.error("get Task Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: HttpStatus.InternalServerError },
    );
  }
}
