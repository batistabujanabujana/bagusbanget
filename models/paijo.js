import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Paijo = db.define(
  "paijos",
  {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    usia: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },

    tinggibadan: {
      type: DataTypes.STRING,
    },
    beratbadan: {
      type: DataTypes.STRING,
    },
    aktivitas: {
      type: DataTypes.STRING,
    },
    jos: {
      type: DataTypes.BOOLEAN,
    },

    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Paijo;
