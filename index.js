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
  res.render("index", {
    nome: nome,
    lang: lang,
    empresa: "First"
  });
});

app.listen(PORT, () => {
  try {
    console.log("server startado, na porta: " + PORT);
  } catch (e) {
    console.log("error: " + e);
  }
});
