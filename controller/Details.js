const {personalInfoDb, educationInfo, expInfo, projInfo, techSkillInfo, activityInfo} = require('../model/detail');

const addPersonalDetails = async (req,res)=>{
    try{
        const contactDetails = req.body.personalInfo;
        console.log(contactDetails.applicantname);
        const person = await personalInfoDb.create({name: contactDetails.applicantname,
            contactNo: contactDetails.contactno,
            emailId: contactDetails.email,
            linkedInId: contactDetails.linkedinlink,
            githubId: contactDetails.githublink});
        return person;
    }
    catch(error){
        console.error(error.message);
        throw error;
    }
}

const addEdDetails = async (req,res)=>{
    try{
        let education;
        const userEd = req.body.education;
        if (Array.isArray(userEd)) {
            const edArray = userEd.map(edN=>({
                instituteName: edN.instituteName,
                Degree: edN.degreeName,
                fromDate: edN.fromDate,
                toDate: edN.toDate,
                course: edN.courseDetails
            }))
            education = await educationInfo.insertMany(edArray);
            return education;
        } else if(typeof userEd === 'object' && userEd !== null){
            // If req.body is a single object, create one document
            education = await educationInfo.create({
                instituteName: userEd.instituteName,
                Degree: userEd.degreeName,
                fromDate: userEd.fromDate,
                toDate: userEd.toDate,
                course: userEd.courseDetails
            });
            return education;
        }
    }
    catch(error){
        console.error(error.message);
        throw error;
    }
}

const addProjectDetails = async (req,res)=>{
    try{
        let projects;
        const userProj = req.body.projects;
        if (Array.isArray(userProj)) {
            const projArray = userProj.map(projN=>({
                projTitle: projN.projectTitle,
                Resources: projN.resourcesUsed,
                projDetails: projN.projectDesc,
            }))
            projects = await projInfo.insertMany(projArray);
            return projects;
        } else if(typeof userProj === 'object' && userProj !== null){
            // If req.body is a single object, create one document
            projects = await projInfo.create({
                projTitle: userProj.projectTitle,
                Resources: userProj.resourcesUsed,
                projDetails: userProj.projectDesc
            });
            return projects;
        }
    }
    catch(error){
        console.error(error.message);
        throw error;
    }
}

const addTechSkill = async (req,res)=>{
    try{
        let techSkills;
        const userTechSkill = req.body.techSkills;
        if (Array.isArray(userTechSkill)) {
            const techSkillArr = userTechSkill.map(techN=>({
                skillName: techN.skillName,
                proficiency: techN.proficiency,
            }))
            techSkills = await techSkillInfo.insertMany(techSkillArr);
            return techSkills;
        } else if(typeof userTechSkill === 'object' && userTechSkill !== null){
            // If req.body is a single object, create one document
            techSkills = await techSkillInfo.create({
                skillName: userTechSkill.skillName,
                proficiency: userTechSkill.proficiency
            });
            return techSkills;
        }
    }
    catch(error){
        console.error(error.message);
        throw error;
    }
}

const addExp = async (req,res)=>{
    try{
        let experience;
        const userExp = req.body.exp;
        if (Array.isArray(userExp)) {
            const expArr = userExp.map(expN=>({
                orgName: expN.orgName,
                designation: expN.designation,
                fromDate: expN.started,
                toDate: expN.ended,
                projOn: expN.orgProjDesc
            }))
            experience = await expInfo.insertMany(expArr);
            return experience;
        } else if(typeof userExp === 'object' && userExp !== null){
            // If req.body is a single object, create one document
            experience = await expInfo.create({
                orgName: userExp.orgName,
                designation: userExp.designation,
                fromDate: userExp.started,
                toDate: userExp.ended,
                projOn: userExp.orgProjDesc
            });
            return experience;
        }
    }
    catch(error){
        console.error(error.message);
        throw error;
    }
}

const addActivity = async (req,res)=>{
    try{
        let userActivity;
        const userAct = req.body.extraSkills;
        if (Array.isArray(userAct)) {
            const actArray = userAct.map(activity=>({
                activityDesc: activity.activity
            }))
            userActivity = await activityInfo.insertMany(actArray);
            return userActivity;
        } else if(typeof userAct === 'object' && userAct !== null){
            // If req.body is a single object, create one document
            userActivity = await activityInfo.create({
                activityDesc: userAct.activity
            });
            return userActivity;
        }
    }
    catch(error){
        console.error(error.message);
        throw error;
    }
}

module.exports = {addPersonalDetails, addEdDetails, addProjectDetails, addTechSkill, addExp, addActivity}