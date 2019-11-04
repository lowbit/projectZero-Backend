const passport = require('passport');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    function getFileExtension(file) {
        var regexp = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        var extension = file.match(regexp);
        return extension && extension[1];
      }
    function getFullDateString(){
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
      return date+'T'+time;
    }
    app.post('/uploadImg', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send({auth:true, message:'No files were uploaded.'});
            }
            let validExtension = false;
            ["png","jpg","jpeg","gif"].forEach(ext=>{
              if(ext===getFileExtension(req.files.file.name)){
                validExtension = true;
              }
            })
            if(validExtension){
              let filePath = path.normalize(path.resolve(__dirname, '..', '..')+'/public/games/'+req.body.title+'/');
              try {
                  if (!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                  }
                } catch (err) {
                  console.error(err)
                }
              let file = req.files.file;
              file.name= req.body.title+'Cover'+getFullDateString()+'.'+getFileExtension(req.files.file.name);
              filePath += file.name;

              let relativeFilePath = path.normalize('/games/'+req.body.title+'/'+file.name);
              file.mv(filePath, function(err) {
                  if(err){
                      return res.status(500).send({auth:true, message:err})
                  } else {
                    res.status(200).send({auth:true, imgPath:relativeFilePath});
                  }
              })
          }
          else {
            return res.status(400).send({auth:true, message:'Uploaded file type not allowed.'});
          }
        });
}