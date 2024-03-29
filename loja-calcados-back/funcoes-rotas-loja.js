var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

function findDoc() {
  return new Promise((resolve, reject) => {
    // console.log(tabelacalcados)
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("gestao_loja");
      dbo
        .collection("estoque_loja")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          resolve(result);
        });
    });
  });
}

function updateDoc(body) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gestao_loja");
    var myquery = { id: body.id };
    var newvalues = {
      $set: {
        id: body.id,
        descricao: body.descricao,
        quantidade: body.quantidade,
        valor: body.valor,
      },
    };
    dbo
      .collection("estoque_loja")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  });
}

function insertDoc(body) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gestao_loja");
    var myobj = {
      id: body.id,
      descricao: body.descricao,
      quantidade: body.quantidade,
      valor: body.valor,
    };
    dbo.collection("estoque_loja").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function deleteDoc(body) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("gestao_loja");
      var myquery = { _id: body._id };
      dbo.collection("estoque_loja").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
        resolve();
      });
    });
  });
}

function insertOrUpdate(body) {
  console.log(body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("gestao_loja");
    var myobj = body;

    console.log(myobj);
    dbo
      .collection("estoque_loja")
      .findOne({ "_id": myobj["_id"] }, function (err, result) {
        if (err) throw err;
        if (result == null) {
          dbo
            .collection("estoque_loja")
            .insertOne(myobj, function (err, result) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();

            });
        } else {
          let newvalues = {
            $set: {
              descricao: myobj.descricao,
              valor: myobj.valor,
              quantidade: myobj.quantidade,
            },
          };
          dbo
            .collection("estoque_loja")
            .updateOne({ "_id": myobj._id }, newvalues, function (err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();

            });
        }
      });
  });
}
module.exports = { findDoc, updateDoc, insertDoc, deleteDoc, insertOrUpdate };
