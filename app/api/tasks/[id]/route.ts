import { HttpStatus } from "@/constants/httpStatus";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const task = await Task.findByPk(id);

    if (!task)
      return NextResponse.json(
        { error: "Task not found" },
        { status: HttpStatus.NotFound },
      );

    await task.update(body);
    return NextResponse.json(task);
  } catch (err) {
    console.error("edit error:", err);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: HttpStatus.InternalServerError },
    );
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const task = await Task.findByPk(id);
    if (!task)
      return NextResponse.json(
        { error: "Task not found" },
        { status: HttpStatus.NotFound },
      );

    await task.destroy();
    return NextResponse.json({ message: "Task deleted" });
  } catch (err) {
    console.error("delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: HttpStatus.InternalServerError },
    );
  }
}
