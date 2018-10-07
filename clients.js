var clients = [];

function addClient(socketId, client){
  if(!client || !client.id || !client.name) return console.log("client or client's id or name is missing");

  var userObject = {
    socketId: socketId,
    id: client.id,
    name: client.name,
  };

  clients.push(userObject);
}

function removeClient(socketId){
  clients = clients.filter(function(client){
    return client && client.socketId !== socketId
  });
}

function getSocketId(clientId){
  theClient = clients.filter(function(client){ return client && client.id === clientId });
  if(theClient.length) return theClient[0].socketId;

  return null;
}

function getClientsList(){
  return clients;
}

module.exports = {
  addClient,
  removeClient,
  getSocketId,
  getClientsList,
}