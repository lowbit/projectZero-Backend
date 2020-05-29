const TierList = require ('../../db/db').TierList;

module.exports = app => {
    app.get('/getTierList/:id',(req,res,next)=>{
        
        var tierListId = req.params.id;
        console.log(tierListId);
        TierList.findOne({
            where:{id:tierListId}
        }).then((tierlist)=>{
            return res.json({tierlist});
        })
    })
}