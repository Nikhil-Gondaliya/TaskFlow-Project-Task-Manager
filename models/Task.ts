import { DataTypes, Model } from "sequelize";
import sequelize from "@/lib/db";
import Project from "./Project";

export type TaskStatus = "todo" | "in-progress" | "done";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: Date;
  public status!: TaskStatus;
  public projectId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "done"),
      defaultValue: "todo",
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  },
);

// Set up associations
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

export default Task;
