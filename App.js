const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Hi there");
    next();
});
app.use((req, res, next) => {
    console.log("Hi there again");
    res.send('<h1>Welcome</h1>');
});

const server = http.createServer(app);

server.listen(4000); 