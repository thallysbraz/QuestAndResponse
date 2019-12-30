const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "First2019", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;
