const http = require('http');

const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('My name is Ahmed.\n');
});

server.listen(port);
