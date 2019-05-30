'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weapon', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weaponName: {
        type: Sequelize.STRING
      },
      weaponCategory: {
        type: Sequelize.STRING
      },
      weaponDescription: {
        type: Sequelize.STRING
      },
      imgPath: {
        type: Sequelize.STRING
      },
      gameId:{
        type: Sequelize.STRING,
        references:{
          model: 'Game',
          key: 'title'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Weapon');
  }
};