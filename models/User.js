'use strict';
const Sequelize=require("sequelize");
module.exports = (sequelize) => {
  const user = sequelize.define('User', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
    },
    first_name: Sequelize.STRING,
    last_name:Sequelize.STRING,
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
       
    },
    
    password:{
        type: Sequelize.STRING,
        allowNull:false,
        
    }, 
    date_birth:Sequelize.STRING,
    
                      

   

}, {

    freezeTableName: true,
    tableName: 'User'
});

user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.Roles, { foreignKey: 'role', targetKey: 'id' });
    user.belongsTo(models.User, { as: 'createdBy', targetKey: 'id' });
    user.belongsTo(models.User,  {  as: 'updatedBy', targetKey: 'id' });
    
    
  };

  return user;
};