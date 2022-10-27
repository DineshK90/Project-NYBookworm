const express = require(`express`);
const bcrypt = require(`bcrypt`);
const sessions = express.Router();
const User = require(`../models/userSchema.js`)

// curl -X POST -H "Content-Type:application/json" -d '{"username":"bob","password":"111"}' http://localhost:3003/sessions

sessions.post(`/`, (req,res)=>{
  User.findOne({username:req.body.username},(err,userDetails)=>{
    if(err){
      res.status(400).json({ err: err.message });
    }else{
      if(userDetails && bcrypt.compareSync(req.body.password,userDetails.password)){
        req.session.currentUser = userDetails;
        console.log('Logged In as ' + req.body.username)
        res.status(200).json();
      }
    }
  })
})
// curl -X DELETE http://localhost:3003/sessions

sessions.delete(`/`,(req,res)=>{
  req.session.destroy(()=>{
    console.log('Logged out')
    res.status(200).json();
  })
})

module.exports = sessions;