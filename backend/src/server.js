const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');

const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect(`mongodb+srv://${process.env.DATA_BASE}:${process.env.DATABASE_PASSWORD}@cluster0-zf6t1.gcp.mongodb.net/omnistack9?retryWrites=true&w=majority`,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})

const connectedUsers = {};

io.on('connection', socket => {

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id
})

app.use((req,res,next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);

server.listen(3333, () =>{
  console.log("Servidor rodando...")
})