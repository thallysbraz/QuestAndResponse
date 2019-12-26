const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//configurações
const PORT = process.env.PORT || 3000;

//configurando EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

//rotas
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.listen(PORT, () => {
  try {
    console.log("server startado, na porta: " + PORT);
  } catch (e) {
    console.log("error: " + e);
  }
});
