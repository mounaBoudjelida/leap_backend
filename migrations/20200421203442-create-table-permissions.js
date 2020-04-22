'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Permissions", {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    
    description:Sequelize.STRING,
    
    createdAt: Sequelize.DATE,
    updatedAt:Sequelize.DATE
    
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Permissions");
  }
};
