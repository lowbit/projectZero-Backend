const Sequelize = require('sequelize');

const UserModel = require('./db/models/user');
const GameModel = require('./db/models/game');
const WeaponModel = require('./db/models/weapon');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const db ={};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = UserModel(sequelize, Sequelize);
db.Game = GameModel(sequelize, Sequelize);
db.Weapon = WeaponModel(sequelize, Sequelize);

db.sequelize.sync()
.then().catch(err => {
 console.log(err);
});

module.exports = db;