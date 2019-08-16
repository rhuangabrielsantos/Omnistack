const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const routes   = require('./routes');

const app      = express();
const server   = require('http').Server(app);
const io       = require('socket.io')(server);

io.on('connection', socket => {
    console.log('New connection', socket.id)
})

mongoose.connect(
    'mongodb+srv://rhuansantos:rhuan123@cluster0-rgvow.mongodb.net/omnistack?retryWrites=true&w=majority', 
    { useNewUrlParser: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);
