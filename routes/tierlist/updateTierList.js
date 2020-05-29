const passport = require('passport');
const TierList = require('../../db/db').TierList;

module.exports = (app) => {
    app.put('/updateTierList', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
           if(req.body && req.body.tierlist){
                let tierlist = req.body.tierlist;
                TierList.findOne({
                    where: {
                        id: tierlist.id
                    },
                }).then((returnedTierList)=>{
                    if(returnedTierList != null){
                        returnedTierList.update({
                            GameId: tierlist.gameId,
                            id:tierlist.id,
                            title: tierlist.title,
                            imgPath: tierlist.imgPath,
                            additionalInfo: tierlist.additionalInfo,
                            updatedAt: new Date(),

                        }).then((result)=>{
                            console.log('Tier List updated');
                            res.status(200).send({auth:true, message:'Tier List updated', result:result});
                            
                        });
                    } else {
                        res.status(404).send({auth:true, message:'Tier List does not exist'});    
                    }
                })
            }
            else {
                res.status(400).send({auth:true, message:'Invalid request'});
            }
        });
}