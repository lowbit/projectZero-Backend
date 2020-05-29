'use strict';
module.exports = (sequelize, DataTypes) => {
  const TierListItem = sequelize.define('TierListItem', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    imgPath: DataTypes.STRING
  }, {});
  return TierListItem;
};