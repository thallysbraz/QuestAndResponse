const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./database/database"); // Import arquivo de config do banco
const Pergunta = require("./database/Pergunta"); // Import arquivo de config para criar tabela Pergunta
const Resposta = require("./database/Resposta"); // Import arquivo de config para criar tabela Resposta

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
//rota raiz
app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [["id", "DESC"]]
    /*
    primeiro "createdAt" parametro nome da coluna a ordenar
    segundo "DESC" parametro tipo de ordenação
    DESC = Decrescente || ASC = Crescente 
    */
  })
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
  //console.log("titulo: " + title + "descrição: " + description);

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

//rota para filtrar pergunta especifica
app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id; //pegando id de pesquisa pelo parametro da URL
  /*console.log("id: ", id); // confirmando se está pegando id */

  //Fazendo a busca no Banco de Dados
  Pergunta.findOne({
    where: { id: id }
  })
    .then(pergunta => {
      //verificando se pergunta existe ou não
      if (pergunta) {
        // se achar a pergunta pelo ID
        res.render("pergunta", {
          pergunta: pergunta
        });
      } else {
        // se não achar a pergunta
        res.redirect("/");
      }
    })
    .catch(error => {
      res.status(404).json({
        msg:
          "Error ao pesquisar pergunta, por favor informe novamente o parametro de pesquisa",
        error: error
      });
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
