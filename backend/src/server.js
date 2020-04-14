const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DATA_BASE}:${process.env.DATABASE_PASSWORD}@cluster0-zf6t1.gcp.mongodb.net/omnistack9?retryWrites=true&w=majority`,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);

app.listen(3333, () =>{
  console.log("Servidor rodando...")
})