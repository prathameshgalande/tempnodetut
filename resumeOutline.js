const {personalInfoDb, educationInfo, expInfo, projInfo, techSkillInfo, activityInfo} = require('../model/detail');

/*
education -
degree          fromDate-toDate -----> inside a span 
instituteName
courses/desc

degreeSpan.style.display = flex;
degreeSpan.style.justifyContent = 'space-between';
degreeSpan.style.flexDirection = 'row';
*/ 
const loadResumeData = async ()=>{
    try{
        const loadEd = await educationInfo.find({});

        loadEd.forEach(education=>{
            const instName = document.createElement('h4');
            instName.textContent = education.instituteName;
            const fromD = new Date(education.fromDate);
            const toD = new Date(education.toDate);
            const dateString = `${fromD.getDate()} ${fromD.getMonth}, ${String(fromD.getFullYear).slice(-2)}` +
                                    `-` + `${toD.getDate()} ${toD.getMonth}, ${String(fromD.getFullYear).slice(-2)}`
            const learningSpan = document.createElement('h4');
            learningSpan.textContent = dateString;
            
            const degreeSpan = document.createElement('span');
            degreeSpan.style.display = 'flex';
            degreeSpan.style.justifyContent = 'space-between';
            degreeSpan.style.flexDirection = 'row';
            degreeSpan.append(instName);
            degreeSpan.append(learningSpan);

            const Degree = document.createElement('h4');
            Degree.textContent = education.Degree;

            const course = document.createElement('p');
            course.textContent = education.course;

            document.querySelector('.academicinfo').append(degreeSpan);
            document.querySelector('.academicinfo').append(Degree);
            document.querySelector('.academicinfo').append(course);
        })
    }
    catch(error){
        console.error(error.message);
    }
}

loadResumeData();