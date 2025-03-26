const {personalInfo, educationInfo, expInfo, projInfo, techSkillInfo, activityInfo} = require('../model/detail');

const addPersonalDetails = async (req,res)=>{
    try{
        const person = await personalInfo.create(req.body);
        res.status(200).json({msg: 'success', person:person});
    }
    catch(error){
        res.status(500).send('Something went wrong: ', error.message);
    }
}

const educationInfo = async (req,res)=>{
    try{
        let person;
        if (Array.isArray(req.body)) {
            person = await educationInfo.insertMany(req.body);
            res.status(201).json({ msg: 'Multiple education info documents created', person: person });
        } else {
            // If req.body is a single object, create one document
            person = await educationInfo.create(req.body);
            res.status(201).json({ msg: 'Education info document created', person: person });
        }
    }
    catch(error){
        res.status(500).send('Something went wrong: ', error.message);
    }
}

module.exports = {addPersonalDetails}