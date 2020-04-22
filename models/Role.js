'use strict';
const Sequelize=require("sequelize");
module.exports = (sequelize) => {
  const role = sequelize.define('Role', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    title: Sequelize.STRING,
    description:Sequelize.STRING,
    permissions:{
        type: Sequelize.JSON,
       
    },

   
   

}, {

    freezeTableName: true,
    tableName: 'Role'
});


role.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.User, { as: 'createdBy', targetKey: 'id' });
    user.belongsTo(models.User,  {  as: 'updatedBy', targetKey: 'id' });
    
    
  };
  return role;
};