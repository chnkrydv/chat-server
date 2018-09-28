var clients = require('./clients');

var onSocketDisconnect = function (socket) {
  return function () {
    clients.removeSocketId(socket.id);
    console.log('socket disconnected');
  }
}

var onClientOnline = function (socket) {
  console.log('client connected');
  return function (client) {
    console.log('client connected');
    if (!clients.isOldClient(client.username)) {
      clients.addNewClient(socket.id, client);
      return;
    }

    clients.addSocketId(client.username, socket.id);
  }
}

var sendToReciever = function (socket) {
  return function (message) {
    var recieverSocketId = clients.getSocketId(message.from);
    console.log('sending message to reciever ', recieverSocketId);
    delete message.to;
    socket.to(recieverSocketId).emit(message);
  }
}

module.exports = {
  onSocketDisconnect,
  onClientOnline,
  sendToReciever,
}