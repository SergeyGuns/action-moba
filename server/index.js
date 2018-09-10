var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Model = require('./model').Model
const Player = require('./player').Player

var session = require("express-session")({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");

io.use(sharedsession(session, {
  autoSave: true
}));

var model = new Model
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
 

io.on('connection', function (socket) {
  console.log(socket)
  socket.on("login", function (userdata) {
    console.log('login', userdata)
    console.log(new Player(userdata.name))
    socket.handshake.session.userdata = userdata;
    socket.handshake.session.save();
    model.addPlayer(new Player(userdata.name))
  });
  socket.on("logout", function (userdata) {
    if (socket.handshake.session.userdata) {
      delete socket.handshake.session.userdata;
      socket.handshake.session.save();
    }
  });
  model.setEmiter(io)
  // // model.setPlayerTarget(0, {x:200,y:300})
  socket.on('SET_TARGET', function(target){
    
 
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
  setInterval(model.loop.bind(model), 1000 / 5)
});