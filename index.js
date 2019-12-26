const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//configurações
const PORT = process.env.PORT || 3000;

//configurando EJS
app.set("view engine", "ejs");

//rotas
app.get("/:nome/:lang", (req, res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirMSG = true;
  var produtos = [
    { nome: "Doritos", preco: 4.5 },
    { nome: "Guarana", preco: 7 },
    { nome: "Ruffles", preco: 5 },
    { nome: "Batata Palha", preco: 3.75 },
    { nome: "Hamburguer", preco: 1 }
  ];

  res.render("index", {
    nome: nome,
    lang: lang,
    empresa: "First",
    msg: exibirMSG,
    produtos: produtos
  });
});

app.listen(PORT, () => {
  try {
    console.log("server startado, na porta: " + PORT);
  } catch (e) {
    console.log("error: " + e);
  }
});
