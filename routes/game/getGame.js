const Game = require ('../../db/db').Game;

module.exports = app => {
    app.get('/getGame/:id',(req,res,next)=>{
        
        var gameId = req.params.id;
        console.log(gameId);
        Game.findOne({
            where:{id:gameId}
        }).then((game)=>{
            return res.json({game});
        })
    })
}