'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weapon = sequelize.define('Weapon', {
    weaponName: DataTypes.STRING,
    weaponCategory: DataTypes.STRING,
    weaponDescription: DataTypes.STRING,
    imgPath: DataTypes.STRING
  }, {});
  Weapon.associate = function(models) {
    
  };
  return Weapon;
};