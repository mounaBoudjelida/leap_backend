'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'User', // name of Source model
      'updatedById', // name of the key we're adding 
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
      
      queryInterface.removeColumn('User', 'updatedById')
    ];
  }
};
