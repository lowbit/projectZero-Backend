const User = require ('../../db').User;
const passport = require('passport');

module.exports = app => {
    app.post('/registerUser', (req, res, next) =>{
        passport.authenticate('register', (err, user, info) =>{
            if(err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.status(403).send(info.message);
            } else {
                req.logIn(user, err => {
                    console.log(user);
                    const data = {
                        email: req.body.email,
                        username:user.username
                    };
                    console.log(data);
                    User.findOne({
                        where: {
                            username:data.username
                        }
                    }).then(user=> {
                        user.update({
                            email: data.email,
                        }).then(() => {
                            console.log('user created in db');
                            res.status(200).send({ message: 'user created'});
                        });
                    });
                });
            }
        })(req, res, next);
    });
}