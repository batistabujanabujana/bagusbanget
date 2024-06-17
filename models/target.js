import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Paijo from "./paijo.js"; // Assuming 'paijo.js' is in the same directory as 'target.js'

const { DataTypes } = Sequelize;

const Target = db.define(
  "target",
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
Paijo.hasOne(Target); // Assuming a one-to-one relationship, adjust if needed
Target.belongsTo(Paijo);

export default Target;
