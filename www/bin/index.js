const server = require('../server.js');
const setSocket = require('../socket.js');

// server
server.listen(process.env.PORT || 3000);
// sokcet
setSocket(server);
