var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets = require('./sockets');

var port = 1989;

function onHttpStartListen() {
  console.log('started listening on port: ' + port);
}

function onIoConnection(socket) {
  console.log('Client connected to socket');

  socket.on('online', sockets.onClientOnline(socket));
  socket.on('needClientsList', sockets.sendClientsList(socket));
  socket.on('message', sockets.sendToReciever(socket));
  socket.on('disconnect', sockets.onClientOffline(socket));
}

io.on('connection', onIoConnection);
http.listen(port, onHttpStartListen);