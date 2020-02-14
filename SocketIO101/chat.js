const express = require('express');
const app = express();
const socketIO = require('socket.io')
app.use(express.static(__dirname + '/public'));

var expressServer = app.listen(9000, () => {
    console.log("Server has started")
})

io = socketIO(expressServer);
io.on('connection', (socket) => {
    socket.emit('messageFromServer', { data: "Welcome to socketio server" })
    socket.on('messageToServer', (dataFromClient) => {
        // console.log(dataFromClient)
    })
    socket.on('newMessageToServer', (msg) => {
        // console.log(msg)
        io.emit('messageToClients', { text: msg.text })
    })
})