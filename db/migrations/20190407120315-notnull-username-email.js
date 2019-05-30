'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', ['username'], {
          type:Sequelize.STRING,
          allowNull: false,
        }, {
          transaction: t
        })
        ,
        queryInterface.changeColumn('Users', ['email'], {
          type:Sequelize.STRING,
          allowNull: false,
        }, {
          transaction: t
        })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Users', ['username'], {
          type:Sequelize.STRING,
          allowNull: true,
        }, {
          transaction: t
        }),
        queryInterface.changeColumn('Users', ['email'], {
          type:Sequelize.STRING,
          allowNull: true,
        }, {
          transaction: t
        })
      ])
    })
  }
};