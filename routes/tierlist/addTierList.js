const passport = require('passport');
const TierList = require('../../db/db').TierList;

module.exports = (app) => {
    app.post('/addTierList', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
           if(req.body && req.body.tierlist){
                let tierlist = req.body.tierlist;
                let valid = true;
                let failedReason = '';
                if (tierlist.GameId===null){
                    valid = false;
                    failedReason = 'game id must be specified'
                }
                if(!valid){
                    res.status(400).send({auth:true, message:failedReason})
                } else {
                    TierList.create({
                        GameId: tierlist.GameId,
                        title: tierlist.title,
                        imgPath: tierlist.imgPath,
                        additionalInfo: tierlist.additionalInfo,
                        createdAt: new Date(),
                    }).then((result) => {
                        res.status(200).send({auth:true, message:'TierList added', result:result});
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