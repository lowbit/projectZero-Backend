const passport = require('passport');
const Game = require('../../db/db').Game;

module.exports = (app) => {
    app.post('/addGame', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
           if(req.body && req.body.game){
                let game = req.body.game;
                Game.findOne({
                    where: {
                        id: game.id
                    },
                }).then((returnedGame)=>{
                    if(returnedGame != null){
                        returnedGame.update({
                            id:game.id,
                            title: game.title,
                            description: game.description,
                            imgPath: game.imgPath,
                            releaseDate: game.releaseDate,
                            createdAt: new Date(),
                            updatedAt: null,

                        }).then(()=>{
                            console.log('Game updated');
                            res.status(200).send({auth:true, message:'Game added'});
                        });
                    } else {
                        res.status(404).send({auth:true, message:'Game does not exist'});    
                    }
                })
            }
            else {
                res.status(400).send({auth:true, message:'Invalid request'});
            }
        });
}