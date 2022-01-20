const express = require("express");
const app = express(); //express app
const http = require("http"); 
const server = http.createServer(app); //l'app viene passata al server http
const { Server } = require("socket.io"); 
const io = new Server(server); //il server http viene passato al socket.io
const port = 3000; //Porta del server
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.set("view engine", "ejs"); //Imposta EJS come motore di visualizzazione

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Giulia:Giulia11@clusterquiz.rzwau.mongodb.net/test", { useUnifiedTopology: true, useNewUrlParser: true });

const schema = new mongoose.Schema({ //Schema dei dati all'interno della collection
    nickname: String,
    points: String
}
);

const Model = mongoose.model("players", schema);

console.clear();



app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/Quiz", (req, res) => {
    res.sendFile(__dirname + "/public/Quiz.html");
});


app.post('/post-feedback', function (req, res) { //Inserimento dei dati nel db

    let newPlayer = new Model({

        nickname: req.body.nickname,
        points: req.body.points
    }

    );
    newPlayer.save();
    res.redirect("/index.html");


});

app.get("/getdetails", function (req, res) { //Stampa dei dati contenuti nel db
    Model.find({}, function (err, playersGame) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { player: playersGame })
        }
    }).sort({ "points": -1 }).collation({locale:"en_US", numericOrdering:true});
});

io.on('connection', function (socket) {    //connessione del socket

    console.log('Nuovo visitatore connesso!');
    socket.on('disconnect', () => {
        console.log('Visitatore disconnesso');
      });
    
});

server.listen(3000, () => {
    console.log("Quizstorm server attivo sulla porta: " + port);
});