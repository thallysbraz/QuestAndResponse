const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//configurações
const PORT = process.env.PORT || 3000;

//configurando EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({ msg: "Bem vindo" });
});

app.listen(PORT, () => {
  console.log("server startado, na porta: " + PORT);
});
