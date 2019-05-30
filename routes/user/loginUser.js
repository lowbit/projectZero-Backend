const User = require ('../../db').User;
const jwtSecret = require('../../config/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = app => {
    app.post('/loginUser', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if(err){
                console.log(err);
            }
            if (info !==undefined){
                console.log(info.message);
                if (info.message === 'bad username') {
                    res.status(401).send(info.message);
                  } else {
                    res.status(403).send(info.message);
                  }
            } else {
                req.logIn(user, err => {
                    User.findOne({
                        where: {
                            username: user.username,
                        },
                    }).then(user => {
                        const token = jwt.sign({id: user.username}, jwtSecret.secret);
                        res.status(200).send ({
                            auth:true,
                            token: token,
                            message: 'user found & logged in',
                        });
                    });
                });
            }
        })(req, res, next);
    });
}