const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./database/connect');
const app = express();
require('dotenv').config();

const port = process.env.PORT||3000;

app.use(express.json());

const start = async ()=>{
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}`));
    }
    catch(error){
        console.log('Error: ', error.message);
    }
}

start();