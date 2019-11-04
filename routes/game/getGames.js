const Game = require ('../../db').Game;

module.exports = app => {
    app.get('/getGames', (req, res, next) => {
        Game.findAll({
        }).then(games=> {
            return res.send({games});
        });
    });
}