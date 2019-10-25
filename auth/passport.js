const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const BCRYPT_SALT_ROUNDS = 12;

const Op = Sequelize.Op;

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require ('../db').User;
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            try {
                User.findOne({
                    where: {
                        [Op.or]: [{
                                username,
                            },
                            {
                                email: req.body.email
                            },
                        ],
                    },
                }).then(user => {
                    if (user !== null) {
                        console.log('username or email already taken');
                        return done(null, false, {
                            message: 'username or email already taken'
                        })
                    }
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                        User.create({
                            username: username,
                            password: hashedPassword,
                            email: req.body.email,
                        }).then(user => {
                            console.log('user created');
                            return done(null, user);
                        });
                    });
                });
            } catch (err) {
                return done(err);
            }
        },
    ),
);

passport.use(
    'login',
    new localStrategy({
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            try {
                User.findOne({
                    where: {
                        username: username,
                    }
                }).then(user => {
                    if (user === null) {
                        return done(null, false, {
                            message: 'bad username'
                        });
                    }
                    bcrypt.compare(password, user.password).then(response => {
                        if (response !== true) {
                            console.log('passwords do not match');
                            return done(null, false, {
                                message: 'passwords do not match'
                            });
                        }
                        console.log('user found and authenticated');
                        return done(null, user);
                    });
                });
            } catch (err) {
                done(err);
            }
        }
    ));

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: `${process.env.JWT_SECRET}`,
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    username: jwt_payload.id,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    })
);