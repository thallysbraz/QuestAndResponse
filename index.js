const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./database/database"); //Import arquivo de config do banco
const perguntaModel = require("./database/Pergunta"); //Import arquivo de config para criar tabela

//conexão com banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("conexão com banco de dados criada");
  })
  .catch(error => {
    console.log("error ao conectar no banco: " + error);
  });

//configurações
const app = express();
const PORT = process.env.PORT || 3000;

//configurando EJS
app.set("view engine", "ejs"); // configurando view
app.use(express.static("public")); //reconhecendo arquivos estaticos

//Config Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  console.log("titulo: " + titulo + "descrição: " + descricao);
  res.json({
    titulo: titulo,
    descricao: descricao
  });
});

//porta que o serve está rodando
app.listen(PORT, () => {
  try {
    console.log("server startado, na porta: " + PORT);
  } catch (e) {
    console.log("error: " + e);
  }
});
