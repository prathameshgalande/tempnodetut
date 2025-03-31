const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./database/connect');
const app = express();
require('dotenv').config();

const port = process.env.PORT||5500;

app.use(express.json());

app.post('/post-resume', (req,res)=>{
    const resumeObj = req.body;
    if(resumeObj){
        return res.status(200).send('Received Resume data successfully');
    }
    return res.status(404).send('Resume obj not received');
})

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