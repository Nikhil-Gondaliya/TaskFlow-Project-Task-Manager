// models/Project.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "@/lib/db";

class Project extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects", // optional, but good for clarity
  },
);

export default Project;
