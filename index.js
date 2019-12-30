const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./database/database"); //Import arquivo de config do banco
const Pergunta = require("./database/Pergunta"); //Import arquivo de config para criar tabela

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
  Pergunta.findAll({ raw: true })
    .then(perguntas => {
      // renderizando view inicial e exibindo perguntas
      res.render("index", {
        perguntas: perguntas
      });
    })
    .catch(Error => {
      console.log("error ao pesquisar perguntas: " + Error);
    });
});
//rota "/perguntar" para renderizar form de pergunta.
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

//rota "/salvarpergunta" para salvar a pergunta no Banco de Dados
app.post("/salvarpergunta", (req, res) => {
  //pegando dados do form e verificando se está tudo certo.
  var title = req.body.titulo;
  var description = req.body.descricao;
  //console.log pra verificar se está recebendo os dados da pergunta
  console.log("titulo: " + title + "descrição: " + description);

  // Pergunta.create para salvar no Banco de Dados
  Pergunta.create({
    titulo: title,
    descricao: description
  })
    .then(success => {
      res.redirect("/");
    })
    .catch(error => {
      console.log("error ao salvar pergunta: " + error);
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
