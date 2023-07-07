const http = require('http');
const fs= require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  const url = req.url;
  const method = req.method;

  // Set the appropriate response based on the URL
  if(url=== "/") {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    fs.readFile('message.txt', 'utf8', (err, data) => {
      if (!err) {
        const messages = data.split('\n').filter((message) => message.trim() !== '');
        res.write('<h1>Messages</h1>');
        res.write('<ul>');
        res.write(`<li>${messages[0].toString()}</li>`);
        res.write('</ul>');
        
      }
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
      res.write('</html>');
      return res.end();
    });
    

  }
  else if(url=== "/message" && method==="POST") {
    const body=[];
    req.on("data",(chunk) => {
      body.push(chunk);
    });
    return req.on("end",() => {
      const parsedBody=Buffer.concat(body).toString();
      const message=parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err)=>{
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
      });
    });
  }
  else if (url === '/home') {
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
});

server.listen(4000);