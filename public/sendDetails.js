
class resume{
    personalInfo = {};
    education = [];
    projects = [];
    exp = [];
    techSkills = [];
    extraSkills = [];

    addContact(personalInfoValues){
        this.personalInfo = personalInfoValues;
    }
    addEducation(edValues){
        this.education.push(edValues);
    }

    addExperience(expValues){
        this.exp.push(expValues);
    }

    addProjects(projValues){
        this.projects.push(projValues);
    }

    addTechnicalskills(techSkillValues){
        this.techSkills.push(techSkillValues);
    }

    addExtracurricular(extraActValues){
        this.extraSkills.push(extraActValues);
    }

    display(){
        console.log("Resume Data:");
        console.log("Personal Info: ", this.personalInfo);
        console.log("Education:", this.education);
        console.log("Experience:", this.exp);
        console.log("Projects:", this.projects);
        console.log("Technical Skills:", this.techSkills);
        console.log("Extra Skills:", this.extraSkills)
    }
}



const addButtons = [
                document.getElementById('addEducation'),
                document.getElementById('addExperience'),
                document.getElementById('addProjects'),
                document.getElementById('addTechSkills'),
                document.getElementById('addActivity')
                ]

const counter = {
                'addEducation':0,
                'addExperience':0,
                'addProjects':0,
                'addTechSkills':0,
                'addActivity':0
                }

addButtons.forEach(button=>{
    button.addEventListener('click', event=>{
        counter[button.id]++;
        const newNode = document.querySelector(`.${button.parentElement.className}`).cloneNode(true); 
        const node_list = document.querySelector(`.${button.parentElement.parentElement.className}`);
        newNode.className = `${button.parentElement.className}` + `${counter[button.id]}`;
        newNode.classList.add(`${button.parentElement.className}`);
        Array.from(newNode.childNodes).forEach(element=>{
            element.id = `${element.id}` + `-` + `${counter[button.id]}`;
        });
        Array.from(newNode.children).forEach(element=>{
            element.value = '';
        })
        if (newNode.lastElementChild.previousElementSibling) {
            newNode.lastElementChild.previousElementSibling.previousElementSibling.id = `sub` + `${button.id}`.slice(3);
            newNode.lastElementChild.previousElementSibling.previousElementSibling.value  = '-';
            newNode.lastElementChild.previousElementSibling.previousElementSibling.classList.add(`${button.id}`);
            newNode.lastElementChild.previousElementSibling.previousElementSibling.classList.add('dynamic-sub-button');
        }
        node_list.append(newNode);
        //console.log(newNode.lastElementChild.id)
        
    });
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('dynamic-sub-button')) {
      event.target.parentElement.remove();
    }
  });

function validateValues(checkNode){
    let isValid = true;
    Array.from(checkNode.parentElement.children).forEach(node=>{
        let newId = node.id.split(' ')[0];
            if(!(['button','label','checkbox'].includes(node.getAttribute('type')))){
                if(node.tagName ==='INPUT' && node.value === ''){
                    const errMsg = document.createElement('p');
                    if(node.id.includes(' ') && newId.slice(0,newId.length-1).endsWith('-')){
                        errMsg.id = `err-${newId.slice(0, newId.length-2)}`; 
                    }
                    else{
                        errMsg.id = `err-${node.id}`;
                    }
                    errMsg.style.color = 'tomato';
                    errMsg.style.fontFamily = 'Arial';
                    errMsg.style.fontSize = '0.9rem';
                    errMsg.style.padding = '5px';
                    if(node.placeholder){
                        errMsg.textContent = `${node.placeholder} cannot be empty!`;
                    }
                    else{
                        errMsg.textContent = `This field cannot be empty!`;
                    }
                    node.parentElement.insertBefore(errMsg, node.nextElementSibling);
                    isValid = false;
                }
                else{
                    let nextOne = node.nextElementSibling
                    if(nextOne.id === `err-${newId.slice(0, newId.length-2)}` || nextOne.id === `err-${node.id}`){
                        node.parentElement.remove(nextOne);
                    }
                }
            }
        
    })
    return isValid;
}


const resume_obj = new resume();

document.addEventListener('change', (event) => {
    if (event.target.id && event.target.id.startsWith('confirm')) {
        //console.log('0 satisfied');
        //console.log(event.target.parentElement.className);
            if(['contact', 'education', 'experience', 'projects', 'technicalskills', 'extracurricular'].some(section => event.target.parentElement.className.includes(section))){
                //console.log('1 satisfied');
                if(event.target.checked === true){
                    //console.log('2 satisfied');
                    if(validateValues(event.target)){
                        //console.log('3 satisfied');
                        let result = {};
                        let sectionName = event.target.parentElement.className;
                        
                        if(sectionName.includes(' ')){
                            sectionName = sectionName.split(' ')[0];
                            sectionName = sectionName.slice(0, sectionName.length - 1);
                        }
                        
                        Array.from(event.target.parentElement.children).forEach(node=>{
                            if(!(['button','checkbox','label'].includes(node.getAttribute('type'))) && node.tagName ==='INPUT'){
                                //console.log('4 satisfied');
                                
                                let nodeKey = node.id;
                                if(nodeKey.includes('-')){
                                    nodeKey = nodeKey.slice(0, nodeKey.length - 2);
                                }
                                //console.log(nodeKey);
                                result[nodeKey] = node.value;
                            }
                            })
                                //console.log(sectionName, 'functionUsed: ', `add${sectionName.charAt(0).toUpperCase()}${sectionName.slice(1)}`)
                                resume_obj[`add${sectionName.charAt(0).toUpperCase()}${sectionName.slice(1)}`](result);
                                console.log(`Added data to ${sectionName}:`, result);
                            
                    }
                }
            }
    }
});

document.querySelector('.applicantDetails').addEventListener('submit', async event=>{
    event.preventDefault();
    //resume_obj.display();
    //module.exports = resume_obj;
    const resumeData = JSON.stringify(resume_obj);
    console.log(resumeData);

    try {
        // 2. Send the data to the backend:
        const response = await fetch('/post-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: resumeData,
        });

        // 3. Handle the backend response:
        if (response.ok) {
            console.log('Resume data sent successfully!');
            // Optionally, redirect the user or display a success message.
            // window.location.href = '/success'; // Example redirect
        } else {
            console.error('Failed to send resume data:', response.statusText);
            // Display an error message to the user.
        }
    } catch (error) {
        console.error('Error sending resume data:', error);
        // Handle network errors or other exceptions.
    }
})

