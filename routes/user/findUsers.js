const passport = require('passport');

module.exports = app => {
    app.get('/findUser', (req, res, next) => {
        passport.authenticate('jwt', { session:false }, (err, user, info) => {
            if(err) {
                console.log(err);
            }
            if(info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                res.status(200).send({
                    auth: true,
                    email: user.email,
                    username:user.username,
                    message: 'user found in db',
                });
            }
        })(req, res, next);
    });
}