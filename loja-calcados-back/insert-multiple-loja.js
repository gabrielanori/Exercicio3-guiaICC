var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("gestao_loja");
  var myobj = [
    { id: 1, descricao: "SCARPIN", valor: 100, quantidade: 15 },
    { id: 2, descricao: "OXFORD", valor: 200, quantidade: 20 },
    { id: 3, descricao: "PEEPTOE", valor: 150, quantidade: 30 }
  ];
  dbo.collection("estoque_loja").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

module.exports = {};
