const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({ force: false })
  .then(() => {
    console.log("tabela Respostas criada com sucesso");
  })
  .catch(error => {
    console.log("Erro ao criar tabela de Respostas: " + error);
  });

module.exports = Resposta;
