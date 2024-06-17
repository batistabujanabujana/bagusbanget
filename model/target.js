import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./usermodel.js";

const { DataTypes } = Sequelize;

const Target = db.define(
  "target",
  {
    tujuanberatbadan: {
      type: DataTypes.DOUBLE,
      defaultValue: 0, // Default 0 jika tidak diisi
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.STRING,
    },
    // Add other fields as needed
  },
  {
    freezeTableName: true,
  }
);

// Define the association between Users and Target
Users.hasOne(Target); // Assuming a one-to-one relationship, adjust if needed
Target.belongsTo(Users);

export default Target;
