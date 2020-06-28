const mongoose = require('mongoose')
const dbUrl = require('./properties').DB;

module.exports = ()=>{
    mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>console.log('Node connected to db on '+ dbUrl))
    .catch(err=>console.log('Conection has error '+err))

    process.on('SIGINT',()=>{
        mongoose.connection.close(()=>{
            console.log('Mongo is disconnected')
            process.exit(0);
        })
    })
}