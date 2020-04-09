const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("./funcoes-rotas-loja");
const cors = require("cors");
const app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("gestao_loja");
  dbo.collection("estoque_loja");
});

app.get("/true", (req, res) => {
  res.send({ chegou: true });
});

app.get("/estoque", async (req, res) => {
  let resultado = await mongo.findDoc();

  res.send(resultado);
});

app.post("/updateCalcado", (req, res) => {
  mongo.updateDoc(req.body);

  res.send();
});

app.post("/insertUpdate", (req, res) => {
  mongo.insertOrUpdate(req.body);

  res.send(req.body);
});

app.post("/insertCalcado", (req, res) => {
  mongo.insertDoc(req.body);

  res.send();
});

app.delete("/deleteCalcado/", async (req, res) => {
  console.log("olha o body aqui", req.body);
  await mongo.deleteDoc(req.body);
  res.send({ success: true });
});

app.listen(3001, () => console.log("servidor rodando na porta 3001"));

// outra opçao de post
//app.post("/insere", (req, res) => {
// const{name, email, whatsup} = req.body;
// return res.send();
//});
