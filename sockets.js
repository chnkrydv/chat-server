var clients = require('./clients');

var onClientOnline = function (socket) {
  return function (client) {
    clients.setClientAvailable(client, socket.id);
  }
}

var sendClientsList = function(socket){
  return function(){
    var okClients = clients.getListOfUsers();
    console.log('hmm ok!! i got clients from root file: ', okClients)
    socket.to(socket.id).emit('clientsList', okClients);
  }
}

var sendToReciever = function (socket) {
  return function (message) {
    var recieverSocketId = clients.getSocketId(message.to);
    delete message.to;
    socket.to(recieverSocketId).emit('message', message);
  }
}

var onClientOffline = function (socket) {
  return function () {
    clients.setClientUnavailable(socket.id);
    console.log('someone disconnected');
  }
}

module.exports = {
  onClientOnline,
  sendClientsList,
  sendToReciever,
  onClientOffline,
}