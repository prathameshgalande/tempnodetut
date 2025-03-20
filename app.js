const http = require('http');
const people = require('./people');

http.createServer((req,res)=>{
    //console.log(req.method);
    if(req.url === '/'){
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(homePage);
    }
    else if(req.url === '/about'){
        res.end("This is the abouts page");
    }
    else if(req.url === '/sample.css'){
        res.writeHead(200, {'content-type':'text/css'});
        res.write(homeStyles);
    }
    else if(req.url === '/sample.js'){
        res.writeHead(200, {'content-type':'text/javascript'});
        res.write(homeLogic);
    }
    else{
        res.writeHead(404, {'content-type':'text/html'});
        res.write('<h1>THE REQUESTED RESOURCE DOES NOT EXIST</h1>');
    }
    res.end();
}).listen(3000, (port=3000)=>{
    console.log(`Listening on port ${port}`)
})

