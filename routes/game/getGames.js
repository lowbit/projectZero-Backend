const Game = require ('../../db').Game;

module.exports = app => {
    app.get('/getGames', (req, res, next) => {
        Game.findAll({
        }).then(games=> {
            console.log(games);
            
            return res.json({games});
        });
    });
}