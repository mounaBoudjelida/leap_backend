'use strict';
const Sequelize=require("sequelize");
module.exports = (sequelize) => {
  const permissions = sequelize.define('Permissions', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    
    description:Sequelize.STRING,
    

   
   

}, {

    freezeTableName: true,
    tableName: 'Permissions'
});


permissions.associate = function(models) {
    // associations can be defined here
    permissions.belongsTo(models.User, { as: 'createdBy', targetKey: 'id' });
    permissions.belongsTo(models.User,  {  as: 'updatedBy', targetKey: 'id' });
    
    
  };
  return permissions;
};