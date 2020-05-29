'use strict';
module.exports = (sequelize, DataTypes) => {
  const TierList = sequelize.define('TierList', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imgPath: DataTypes.STRING,
    additionalInfo: DataTypes.STRING
  }, {});
  return TierList;
};