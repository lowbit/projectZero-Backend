'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    imgPath: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Weapon)
  };
  return Game;
};