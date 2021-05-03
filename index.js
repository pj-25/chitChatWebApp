const express = require('express');
const app = express();
const http = require('http');
const { dirname } = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

var userSockets = {};

app.get('/json', (req, res) => {
    res.json({
        'friendID': 'xyz',
        'message': 'Hello World!'
    });
});

io.on('connection', (socket) => {
    let name = "anonymous";
    socket.on('userName', (userName) => {
        //userSockets.put(userName, socket);
        name = userName;
    });
    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    });
});

app.use((req, res) => {
    res.status(404).redirect('/404.html');
});


server.listen(8585, () => {
    console.log('listening on *:8585');
});
