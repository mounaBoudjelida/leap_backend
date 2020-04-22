const express = require("express");


const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

//Cors
var cors = require('cors');
app.use(cors());




app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))


//DB connection: 
//require("./database/connection");


// Definition des modeles
const models = require('./models');
const user =models.User;
const roles=models.Roles;









//Launching the server: 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port: ${port}`));