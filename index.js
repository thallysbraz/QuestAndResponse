const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//configurações
const PORT = process.env.PORT || 3000;

//configurando EJS
app.set("view engine", "ejs");

//rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  try {
    console.log("server startado, na porta: " + PORT);
  } catch (e) {
    console.log("error: " + e);
  }
});
