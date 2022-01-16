const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.set("view engine", "ejs"); //Imposta EJS come motore di visualizzazione

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Giulia:Giulia11@clusterquiz.rzwau.mongodb.net/test", { useUnifiedTopology: true, useNewUrlParser: true });

const schema = new mongoose.Schema({
    nickname: String,
    points: String
}
);

const Model = mongoose.model("players", schema);

console.clear();

const port = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/Quiz", (req, res) => {
    res.sendFile(__dirname + "/public/Quiz.html");
});


app.post('/post-feedback', function (req, res) {

    let newPlayer = new Model({

        nickname: req.body.nickname,
        points: req.body.points
    }

    );
    newPlayer.save();
    res.redirect("/index.html");


});

app.get("/getdetails", function (req, res) {
    Model.find({}, function (err, playersGame) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { player: playersGame })
        }
    }).sort({ "points": -1 });
})

io.on('connection', function (socket) {

    console.log('Nuovo visitatore connnesso!');
    socket.on('disconnect', () => {
        console.log('Visitatore disconnesso');
      });
    
});

server.listen(3000, () => {
    console.log("Quizstorm server attivo sulla porta: " + port);
});