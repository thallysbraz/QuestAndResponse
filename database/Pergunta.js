const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("perguntas", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({ force: false })
  .then(() => {
    console.log("tabela Perguntas criada com sucesso");
  })
  .catch(error => {
    console.log("Erro ao criar tabela de Perguntas: " + error);
  });

module.exports = Pergunta;
