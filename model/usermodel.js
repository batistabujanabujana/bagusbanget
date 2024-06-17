import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usia: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default 0 jika tidak diisi
      allowNull: true, // Bisa menerima nilai null
    },
    gender: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default 0 jika tidak diisi
      allowNull: true, // Bisa menerima nilai null
    },

    tinggibadan: {
      type: DataTypes.DOUBLE,
      defaultValue: 0, // Default 0 jika tidak diisi
      allowNull: true, // Bisa menerima nilai null
    },
    beratbadan: {
      type: DataTypes.DOUBLE,
      defaultValue: 0, // Default 0 jika tidak diisi
      allowNull: true, // Bisa menerima nilai null
    },
    aktivitas: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default 0 jika tidak diisi
      allowNull: true, // Bisa menerima nilai null
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

export default Users;
