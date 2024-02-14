require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// To store only specified fields from Schema in DB
mongoose.set('strictQuery', true);

// connecting to db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection
db.on('error', (error)=> console.log(error));
db.once('open', ()=> console.log('Connected to Database!'))


// <------------------------------------------------------>

app.use(cors());
app.use(express.json())

const cdRouter = require('./routes/data');
app.use('/api/v1', cdRouter);

// <------------------------------------------------------>
// starting server
app.listen(4004, ()=> console.log('server started'))
