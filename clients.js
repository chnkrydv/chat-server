var clients = [];

function isOldClient(id){
  var client = clients.filter(function (client){
    return client && client.id === id;
  });

  return !!client.length;
}

function addClient(socketId, client){
  if(!client || !client.id || !client.name) return console.log("client or client's id or name is missing");

  var userObject = {
    socketId: socketId,
    id: client.id,
    name: client.name,
    available: true,
  };

  clients.push(userObject);
  console.log(clients);
}

function updateClient(id, socketId, available){
  clients = clients.map(function(client){
    if(client && client.id === id) {
      if(typeof socketId === 'string') client.socketId = socketId;
      if(typeof available === 'boolean') client.available = available;
    }
    return client;
  });
}

function setClientAvailable(client, socketId){
  if(!client || !client.id || !client.name) return console.log("client or client's id or name is missing");

  if (!isOldClient(client.id)) {
    addClient(socketId, client);
    return;
  }

  updateClient(client.id, socketId, true);
  console.log(clients);
}

function getListOfUsers(){
  console.log('ooohhh!! someone requested clients list')
  return clients;
}

function getSocketId(id){
  theClient = clients.filter(function(client){ return client && client.id === id });
  if(theClient.length) return theClient[0].socketId;

  return null;
}

function setClientUnavailable(socketId){
  clients = clients.map(function(client){
    if(client && client.socketId === socketId) {
      client.socketId = '';
      client.available = false;
    }
    return client;
  });
  console.log(clients);
}

module.exports = {
  setClientAvailable,
  getListOfUsers,
  getSocketId,
  setClientUnavailable,
}