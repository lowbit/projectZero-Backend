
const passport = require('passport');

const roleCheck = (req, res, next, roles) => {
  if(roles && roles.includes(req.user.role)){
      return true;
  }
  res.status(401).send({auth:true, message:req.user.role+' user role forbidden from making this request!'});
  return false;
};
  
  module.exports = {
    roleCheck
  }