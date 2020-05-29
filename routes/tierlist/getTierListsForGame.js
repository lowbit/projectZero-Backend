const TierList = require ('../../db/db').TierList;

module.exports = app => {
    app.get('/getTierListsForGame/:id',(req,res,next)=>{
        
        var gameId = req.params.id;
        console.log(gameId);
        TierList.findOne({
            where:{GameId:gameId}
        }).then((tierlists)=>{
            return res.json({tierlists});
        })
    })
}