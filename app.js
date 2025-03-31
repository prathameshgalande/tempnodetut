const express = require('express');
const {addPersonalDetails, 
    addEdDetails, 
    addProjectDetails, 
    addTechSkill, 
    addExp, 
    addActivity} = require('./controller/Details');
const path = require('path');
const connectDb = require('./database/connect');
const app = express();
require('dotenv').config();

const port = process.env.PORT||3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
        res.status(200).sendFile(path.join(__dirname, '/public','/enterdetails.html'));
        console.log('Loaded Home page successfully');
})

app.post('/post-resume', async (req,res)=>{
    const resumeObj = req.body;
    try {
        const person = await addPersonalDetails(req, res);
        const education = await addEdDetails(req, res);
        const projects = await addProjectDetails(req, res);
        const techSkills = await addTechSkill(req, res);
        const experience = await addExp(req, res);
        const userActivity = await addActivity(req, res);

    // If all controller functions succeeded, send a success response
        res.sendFile(path.join(__dirname, '/public', '/resumeoutline.html'));
        console.log('Resume page loaded successfully');
      } catch (error) {
        // Error already handled in the controller functions, no need to send another error here
        // the controller functions set the status code and send the error.
        // If you'd like to do additional error handling for the entire process, you can do it here.
        console.log('Error: ', error.message);
      }
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
