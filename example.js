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

app.get('/api/v1/query', (req,res)=>{
    const {search} = req.query;
    const individuals = [...people];
    if(search){
        const person = individuals.filter(person=>person.city === search);
        if(person.length > 0){
            res.status(200).json(person);
        }
        else{
            res.status(404).send("No match found for your search");
        }
    }
    else{
        res.status(200).json(individuals);
    }
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