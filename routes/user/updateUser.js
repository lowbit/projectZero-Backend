/* eslint-disable no-console */
const passport = require('passport');
const User = require ('../../db').User;

module.exports = (app) => {
  app.put('/updateUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        User.findOne({
          where: {
            username: req.body.username,
          },
        }).then((userInfo) => {
          if (userInfo != null) {
            console.log('user found in db');
            userInfo
              .update({
                email: req.body.email,
              })
              .then(() => {
                console.log('user updated');
                res.status(200).send({ auth: true, message: 'user updated' });
              });
          } else {
            console.error('no user exists in db to update');
            res.status(401).send('no user exists in db to update');
          }
        });
      }
    })(req, res, next);
  });
};