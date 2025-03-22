const express = require('express');
const path = require('path');
let {people} = require('./people');
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sample.html'));
});

app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true, data:people});
} )

app.post('/handleIt', (req,res)=>{
    //console.log(req.body);
    const {personname, personpwd} = req.body;
    if(personname && personpwd){
        if(personname.toLowerCase() === 'john' && personpwd === '1234'){
            res.status(200).send(`Welcome ${personname}`);
        }
        else{
            res.status(401).send('Incorrect username or password');
        }
    }
    else{
        res.send('Username/Password cannot be empty');
    }
})

app.post('/takeAction', (req,res)=>{
    console.log(req.body);
    if(req.body){
        res.json({success:true});
    }
    else{
        res.json({success:false});
    }
})

app.listen(3000, ()=>console.log('Listening on port 3000'));