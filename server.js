const express = require("express");
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const properties = require('./config/properties')
//init db
const DB = require('./config/db');
DB();



const app = express();
const router = express.Router();


const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cors());
app.use(router)


app.use('/api', router);

authRoutes(router);
// POST method route
/* app.post('/login', function (req, res) {
    const data =req.body;
    console.log('information receive on server'+data);
    console.log("busqueda: ",fakeDb.some(item=>{
        console.log(item)
        return item.username==data.username;
    }))
    const resp = fakeDb.some(item=>{
        console.log(item)
        return item.email===data.email;
    })
    res.send(resp);
  }); */

  app.listen(properties.PORT, () => {
    console.log(`El servidor está inicializado en el puerto: ${properties.PORT}`);
   });