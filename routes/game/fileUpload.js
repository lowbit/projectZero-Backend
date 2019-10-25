const passport = require('passport');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    function getFileExtension(file) {
        var regexp = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        var extension = file.match(regexp);
        return extension && extension[1];
      }
    app.post('/uploadImg', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send({auth:true, message:'No files were uploaded.'});
            }
            
            let filePath = path.resolve(__dirname, '..', '..')+'/public/games/'+req.body.id;
            try {
                if (!fs.existsSync(filePath)){
                  fs.mkdirSync(filePath)
                }
              } catch (err) {
                console.error(err)
              }
            let file = req.files.file;
            file.name= req.body.id+getFileExtension(req.files.file.name);
            file.mv(filePath, function(err) {//fix this
                if(err){
                    return res.status(500).send({auth:true, message:err})
                }
            })
        });
}