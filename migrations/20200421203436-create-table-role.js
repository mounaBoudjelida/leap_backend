'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Role", {
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
    
    createdAt: Sequelize.DATE,
    updatedAt:Sequelize.DATE
    
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Role");
  }
};
