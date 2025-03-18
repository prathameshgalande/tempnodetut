const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.end('Welcome to our Home Page');
    }
    if(req.url === '/about'){
        res.end('This is a short summary of our website');
    }
})

server.listen(3000);
console.log("Listening to port 3000...Please go to localhost:3000 on your browser...");
