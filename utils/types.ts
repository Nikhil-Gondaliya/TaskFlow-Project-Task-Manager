export type Task = {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
  date: string;
  description?: string;
  projectId: string;
};

export type ProjectDataType = {
  id?: string;
  name: string;
  description: string;
};
