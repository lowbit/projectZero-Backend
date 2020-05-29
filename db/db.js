const Sequelize = require('sequelize');

const UserModel = require('./models/user');
const GameModel = require('./models/game');
const TierListModel = require('./models/tierlist');
const TierListItemModel = require('./models/tierlistitem');
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
db.TierList = TierListModel(sequelize, Sequelize);
db.TierListItem = TierListItemModel(sequelize, Sequelize);

//Associations
db.TierList.hasMany(db.TierListItem);
db.TierList.belongsTo(db.Game);

db.sequelize.sync()
.then().catch(err => {
 console.log(err);
});

module.exports = db;