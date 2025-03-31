const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [40, 'Name cannot be more than 40 characters']
    }, 
    contactNo:{
        type: String,
        required: [false],
        maxlength: [10]
    },
    emailId:{
        type: String,
        required: [true, 'email-id cannot be empty']
    },
    githubId:{
        type: String,
        required: [false]
    },
    linkedInId:{
        type: String,
        required: [true, 'must provide linked-in id']
    }
});

const edInfoSchema = new mongoose.Schema({
    instituteName:{
        type: String,
        required: [true, 'must provide an institute name'],
        trim: true
    }, 
    Degree:{
        type: String,
        required: [true]
    },
    fromDate:{
        type: Date,
        required: [true]
    },
    toDate:{
        type: Date,
        required: [true]
    },
    course:{
        type: String,
        required: [true]
    }
});

const expSchema = new mongoose.Schema({
    orgName:{
        type: String,
        required: [true, 'must provide an organization name'],
        trim: true
    }, 
    designation:{
        type: String,
        required: [true]
    },
    fromDate:{
        type: Date,
        required: [true]
    },
    toDate:{
        type: Date,
        required: [true]
    },
    projOn:{
        type: String,
        required: [false]
    }
});

const projectSchema = new mongoose.Schema({
    projTitle:{
        type: String,
        required: [true, 'must provide a project title'],
        trim: true
    }, 
    Resources:{
        type: String,
        required: [true]
    },
    projDetails:{
        type: String,
        required: [true]
    }
});

const techSkillSchema = new mongoose.Schema({
    skillName:{
        type: String,
        required: [true],
        trim: true
    }, 
    proficiency:{
        type: String,
        required: [true]
    }
});

const activitySchema = new mongoose.Schema({
    activityDesc:{
        type: String,
        required: [false],
        trim: true
    } 
});

const personalInfoDb = mongoose.model('Personal_info', personalInfoSchema);
const educationInfo = mongoose.model('Education_info', edInfoSchema);
const expInfo = mongoose.model('Experience_info', expSchema);
const projInfo = mongoose.model('Projects_info', projectSchema)
const techSkillInfo = mongoose.model('Technical_Skills_info', techSkillSchema)
const activityInfo = mongoose.model('Activities', activitySchema)

module.exports = {personalInfoDb, educationInfo, expInfo, projInfo, techSkillInfo, activityInfo};