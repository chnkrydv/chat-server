var clients = require('./clients');

var broadcastClientsList = function(io){
  var availableClients = clients.getClientsList();
  console.log('updated clients list\n', availableClients, '\n\n\n');
  io.emit('clientsList', availableClients);
}

var onClientOnline = function (socket, io) {
  return function (client) {
    clients.addClient(socket.id, client);
    console.log('someone came online');
    broadcastClientsList(io);
  }
}

var onClientOffline = function (socket, io) {
  return function () {
    clients.removeClient(socket.id);
    console.log('someone disconnected');
    broadcastClientsList(io);
  }
}

var sendToReciever = function (socket, io) {
  return function (message) {
    console.log('message recieved from ' + message.from + ' to send to ' + message.to);
    var recieverSocketId = clients.getSocketId(message.to);
    delete message.to;
    socket.to(recieverSocketId).emit('message', message);
  }
}

module.exports = {
  onClientOnline,
  onClientOffline,
  sendToReciever,
}