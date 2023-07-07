const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  const url = req.url;

  // Set the appropriate response based on the URL
  if (url === '/home') {
    res.statusCode = 200;
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body>Welcome home.</body>');
    res.write('</html>');
  } else if (url === '/about') {
    res.statusCode = 200;
    res.write('<html>');
    res.write('<head><title>About Page</title></head>');
    res.write('<body>Welcome to the About Us page.</body>');
    res.write('</html>');
  } else if (url === '/node') {
    res.statusCode = 200;
    res.write('<html>');
    res.write('<head><title>Node</title></head>');
    res.write('<body>Welcome to my Node.js project.</body>');
    res.write('</html>');
  } else {
    res.statusCode = 404;
    res.write('<html>');
    res.write('<head><title>Page Not Found</title></head>');
    res.write('<body>404 Page Not Found</body>');
    res.write('</html>');
  }
  res.end();
});

server.listen(4000);