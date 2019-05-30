'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint('Users', ['username'], {
          type: 'unique',
          name: 'uc_username'
        }, {
          transaction: t
        }).catch(Sequelize.ValidationError, function (msg){console.log(msg);})
        ,
        queryInterface.addConstraint('Users', ['email'], {
          type: 'unique',
          name: 'uc_email'
        }, {
          transaction: t
        })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint('Users', 'uc_username', {
          transaction: t
        }),
        queryInterface.removeConstraint('Users', 'uc_email', {
          transaction: t
        })
      ])
    })
  }
};