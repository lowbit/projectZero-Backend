'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Game', [{
      title:'Apex Legends',
      description:'Apex Legends is a battle royale game based in the Titanfall universe that\'s defined by squad battles emphasizing teamwork and use of a unique pinging system.',
      releaseDate:'2019-02-04',
      imgPath:'/img/game/apex/apex-legends.png',
      createdAt:Sequelize.fn('NOW'),
      updatedAt:Sequelize.fn('NOW')
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Game', null,{});
  }
};
