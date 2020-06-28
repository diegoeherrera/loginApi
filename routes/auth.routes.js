const Users = require('./auth.controller');


module.exports = (router)=>{

    //hace un S
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
}

