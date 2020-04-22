'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("User", {
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
    createdAt: Sequelize.DATE,
    updatedAt:Sequelize.DATE
    
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("User");
  }
};
