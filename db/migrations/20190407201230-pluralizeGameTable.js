'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Game','Games');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Games','Game');
  }
};
