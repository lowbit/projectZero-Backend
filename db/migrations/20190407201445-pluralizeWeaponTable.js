'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Weapon','Weapons');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Weapons','Weapon');
  }
};
