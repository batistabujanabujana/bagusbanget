import { Sequelize } from "sequelize";
const db = new Sequelize("bagus", "root", "", {
  // host: "34.31.50.54",
  host: "localhost",
  dialect: "mysql",
});

export default db;
