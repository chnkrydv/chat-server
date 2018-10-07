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

  socket.on('online', sockets.onClientOnline(socket, io));
  socket.on('message', sockets.sendToReciever(socket, io));
  socket.on('disconnect', sockets.onClientOffline(socket, io));
}

io.on('connection', onIoConnection);
http.listen(port, onHttpStartListen);