var clients = [];

function isOldClient(username){
  console.log('isOldClient', username)
  console.log('clients', clients, '\n\n\n');
  var client = clients.filter(function (client){
    return client.username === username;
  });

  return !!client.length;
}

function addNewClient(socketId, client){
  console.log('addNewClient', socketId, client)
  var userObject = {
    socketId: socketId,
    username: client.username,
    name: client.name,
  };

  clients.push(userObject);
  console.log('clients', clients, '\n\n\n');
}

function addSocketId(username, socketId){
  console.log('addSocketId', username, socketId)
  console.log('clients', clients, '\n\n\n');
  clients = clients.map(function(client){
    if(client.username === username) client.socketId = socketId;
  })
}

function removeSocketId(socketId){
  console.log('clients', clients, '\n\n\n');
  console.log('removeSocketId', socketId)
  clients = clients.map(function(client){
    if(client.socketId === socketId) client.socketId = '';
  })
}

function getSocketId(username){
  console.log('getSocketId', username)
  console.log('clients', clients, '\n\n\n');
  theClient = clients.filter(function(client){
    return client.username === username
  })

  if(theClient.length) return theClient[0].socketId;
  return null;
}

module.exports = {
  clients,
  isOldClient,
  addNewClient,
  addSocketId,
  removeSocketId,
  getSocketId,
}