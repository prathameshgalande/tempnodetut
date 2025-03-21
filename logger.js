const logger = ((req, res, next)=>{
    const method = req.method;
    const url = req.url;
    const now = new Date().getFullYear();

    console.log(method,url,now);
    next();
})

module.exports = logger;