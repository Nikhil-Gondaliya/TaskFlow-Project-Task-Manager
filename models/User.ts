import { DataTypes, Model } from "sequelize";
import sequelize from "@/lib/db";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // add this if you're not using createdAt/updatedAt
  },
);

export default User;
