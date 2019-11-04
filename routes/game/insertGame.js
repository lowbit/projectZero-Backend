const passport = require('passport');
const Game = require('../../db').Game;

module.exports = (app) => {
    app.post('/addGame', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
           if(req.body && req.body.game){
                let game = req.body.game;
                let valid = true;
                let failedReason = '';
                if (game.description.length>255){
                    valid = false;
                    failedReason = 'Description must be less than 255 chars.'
                }
                if (game.title.length<2){
                    valid = false;
                    failedReason = 'Title must be at least 2 chars.'
                }
                if(!valid){
                    res.status(400).send({auth:true, message:failedReason})
                } else {
                    Game.create({
                        title: game.title,
                        description: game.description,
                        imgPath: game.imgPath,
                        releaseDate: game.releaseDate,
                        createdAt: new Date(),
                    }).then((result) => {
                        res.status(200).send({auth:true, message:'Game added', result:result});
                    }).catch((error) => {
                        res.status(400).send({auth:true, message:'Invalid request', error:error});
                    });
            }
            }
            else {
                res.status(400).send({auth:true, message:'Invalid request'});
            }
        });
}