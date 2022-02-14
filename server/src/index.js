const http = require('http');

const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app); //better for websocket

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
