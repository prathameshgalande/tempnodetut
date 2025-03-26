const mongoose = require('mongoose');

const connectDb = (url=>{
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
})

module.exports = connectDb;
