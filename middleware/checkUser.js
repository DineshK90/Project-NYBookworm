const checkUser = (req,res,next) => {

  if(req.session.currentUser !== undefined){
    res.locals.user = req.session.currentUser.username;
    res.locals.role = req.session.currentUser.role;
  } else {
    res.locals.user = ``;    
  }
  next();
}

module.exports = checkUser;