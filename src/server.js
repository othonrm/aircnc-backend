const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

require('dotenv').config();

// console.log("Application name: ", process.env.APP_NAME);

const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {

    // console.log(socket.handshake.query);

    // console.log('Usuário conectado!', socket.id);

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

    console.log(connectedUsers);

    // socket.on('disconnect', function() {
    //     console.log('Got disconnect!', socket.id);
    // });
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());

app.use(express.json());

app.use('/files', express.static( path.resolve(__dirname, '..', 'storage', 'uploads') ));

app.use(routes);

server.listen(3333);
