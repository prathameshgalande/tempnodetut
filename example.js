const express = require('express');
const {people} = require('./people');
const app = express();

app.get('/', (req,res)=>{
    res.send('<h1>This is the home page</h1><br><a href="/api/city">View city</a>')
})

app.get('/api/city', (req,res)=>{
    const filtered = people.map(person=>{
        const {id, name, city} = person;
        return {id, name, city};
    });

    res.json(filtered);
})

app.get('/api/:personID', (req,res)=>{
    const {personID} = req.params;
    const individual = people.find(person=> person.id === Number(personID));
    if(!individual){
        return res.status(404).send('Person does not exist');
    }
    res.json(individual);
})

app.listen(3000, ()=>{
    console.log('Listening at port 3000');
})