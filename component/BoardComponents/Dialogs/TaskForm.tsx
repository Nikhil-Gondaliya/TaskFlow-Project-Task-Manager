"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/component/Common/UICommonComponent/Input";
import Button from "@/component/Common/UICommonComponent/Button";
import Textarea from "@/component/Common/UICommonComponent/Textarea";
import Select from "@/component/Common/UICommonComponent/Select";
import moment from "moment";

const taskSchema = z
  .object({
    title: z.string().refine((value) => !!value, {
      message: "This is a mandatory field",
    }),
    description: z.string().optional(),
    date: z.string(),
    status: z.enum(["todo", "in-progress", "done"]),
  })
  .superRefine((data, ctx) => {
    console.log("Validating task data:", data);
    if (data.date === "Invalid date" || data.date.trim() === "") {
      ctx.addIssue({
        path: ["date"],
        code: z.ZodIssueCode.custom,
        message: "This is a mandatory field",
      });
    }
  });

export type TaskFormData = z.infer<typeof taskSchema>;

type TaskFormProps = {
  initialValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  submitLabel: string;
  cancelLabel?: string;
};

export default function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel = "Cancel",
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      date: moment(initialValues?.date ?? "").format("YYYY-MM-DD"),
      status: initialValues?.status ?? "todo",
    },
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        type="text"
        placeholder="Title"
        register={register("title")}
        error={errors.title}
      />

      <Textarea
        placeholder="Description"
        rows={3}
        register={register("description")}
      />

      <FormInput
        type="date"
        placeholder="Data"
        register={register("date")}
        error={errors.date}
      />

      <Select
        register={register("status")}
        options={[
          { value: "todo", label: "To Do" },
          { value: "in-progress", label: "In Progress" },
          { value: "done", label: "Done" },
        ]}
      />

      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={handleCancel} type="button">
          {cancelLabel}
        </Button>

        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
