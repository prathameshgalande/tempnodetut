const authorize = ((req,res,next)=>{
    const {user} = req.query;

    if(user === 'John'){
        req.user = {name:'John', id:4};
        next();
    }
    else{
        res.status(401).send('Unauthorized user');
    }
})

module.exports = authorize;