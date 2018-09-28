var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets = require('./sockets');
// var clients = require('./clients');

var port = 1989;

function onHttpStartListen() {
  console.log('started listening on port: ' + port);
}

function onIoConnection(socket) {
  console.log('Client connected to socket');

  socket.on('online', sockets.onClientOnline(socket));
  console.log('onClientOnline done');
  socket.on('message', sockets.sendToReciever(socket));
  console.log('sendToReciever done');
  socket.on('disconnect', sockets.onSocketDisconnect(socket));
  console.log('onSocketDisconnect done');
}

io.on('connection', onIoConnection);
http.listen(port, onHttpStartListen);