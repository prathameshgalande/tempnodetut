document.querySelector('#goAbout').addEventListener('click',event=>{
    const para = document.createElement('p');
    para.style.textAlign = 'center';
    para.style.fontFamily = 'Arial';
    para.textContent = 'YOU CLICKED THE BUTTON';
    document.body.append(para);
})