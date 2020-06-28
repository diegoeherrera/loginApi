const Users = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'secret123456';


exports.createUser=(req, res, next)=>{
    const newUser = {
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
        
    }

    Users.create(newUser,(err,user)=>{
        if(err && err.code === 11000) return res.status(409).send('Email already exist!');
        if(err) return res.status(500).send('Server Error');
        const expiresIn = 24 * 60 * 60;
        const accessToken= jwt.sign(
            { id:user.id },
            SECRET_KEY,
            { expiresIn:expiresIn }
         )

         const userData = {
             email:user.email,
             password:user.passowrd,
             accessToken:accessToken,
             expiresIn:expiresIn
         }
         res.send({userData});
    });
}
    exports.loginUser = (req, res, next)=>{
        const userData = {
            email:req.body.email,
            password:req.body.password
        }

        Users.findOne({email:userData.email},(err,user)=>{
            if(err) return res.status(500).res.send("Server Error")
            if(!user){
                res.status('409').send({message:"Something is wrong"})
            } else {
                const resulPassword = bcrypt.compareSync(userData.password, user.password)
                if(resulPassword){
                    const expiresIn = 24 * 60 * 60;
                    const accessToken = jwt.sign({id:user.id}, SECRET_KEY, {expiresIn})

                    const userData = {
                        email:user.email,
                        accessToken:accessToken,
                        expiresIn:expiresIn
                    }
                    res.send({userData})
                }else{
                    res.status('409').send({message:"Something is wrong"})
                }
                
            }
        })
    }

/*


if (!user) {
      // email does not exist
      res.status(409).send({ message: 'Something is wrong' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ dataUser });



*/

