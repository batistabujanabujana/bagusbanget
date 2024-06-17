import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./usermodel.js";

const { DataTypes } = Sequelize;

const Bisa = db.define(
  "bisa",
  {
    tujuanberatbadan: {
      type: DataTypes.STRING,
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
Users.hasOne(Bisa); // Assuming a one-to-one relationship, adjust if needed
Bisa.belongsTo(Users);

export default Bisa;
