const setSocket = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log(' a user connected. ');
  });

};

module.exports = setSocket;
