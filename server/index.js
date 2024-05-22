
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors')

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors());

const TodoItemsRoute = require('./routes/todoItems'); 

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server Connected`));

app.use('/', TodoItemsRoute);
