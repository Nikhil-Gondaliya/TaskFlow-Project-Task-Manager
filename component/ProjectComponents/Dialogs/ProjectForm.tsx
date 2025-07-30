"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/component/Common/UICommonComponent/Input";
import Button from "@/component/Common/UICommonComponent/Button";
import Textarea from "@/component/Common/UICommonComponent/Textarea";

export const projectSchema = z.object({
  name: z.string().min(1, "This is a mandatory field"),
  description: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

type Props = {
  defaultValues?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  submitText?: string;
  loading: boolean;
};

export default function ProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitText,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="space-y-4"
    >
      <FormInput
        type="text"
        placeholder="Project name"
        register={register("name")}
        error={errors.name}
      />

      <Textarea
        placeholder="Description"
        rows={3}
        register={register("description")}
        error={errors.description}
      />

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {submitText || "Create"}
        </Button>
      </div>
    </form>
  );
}
