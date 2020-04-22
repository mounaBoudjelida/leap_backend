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
const role=models.Role;
const permissions=models.Permissions;


// Definition of controllers
const rolesCtrl=require('./controleurs/RolesCtrl')(user, role, permissions);
const permissionsCtrl=require('./controleurs/PermissionsCtrl')(user, permissions);





// Definition of routes
const rolesRoutes = require('./routes/RolesRoutes')(express, rolesCtrl);
app.use('/roles', rolesRoutes);
const permissionsRoutes = require('./routes/PermissionsRoutes')(express, permissionsCtrl);
app.use('/permissions', permissionsRoutes);


//Launching the server: 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port: ${port}`));