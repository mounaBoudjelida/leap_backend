'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'Permissions', // name of Source model
      'createdById', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'User', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      
    );
  
   
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Permissions', 'createdById'),
     
    ];
  }
};
