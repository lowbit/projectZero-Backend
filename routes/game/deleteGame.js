/* eslint-disable no-console */
const passport = require('passport');
const Game = require ('../../db/db').Game;

module.exports = (app) => {
  app.delete('/deleteGame', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        Game.destroy({
          where: {
            id: req.query.id,
          },
        })
          .then((gameInfo) => {
            if (gameInfo === 1) {;
              res.status(200).send('game deleted from db');
            } else {
              res.status(404).send('game with passed ID not found');
            }
          })
          .catch((error) => {
            console.error('problem communicating with db');
            res.status(500).send(error);
          });
      }
    })(req, res, next);
  });
};