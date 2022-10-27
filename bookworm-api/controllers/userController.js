// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const users = express.Router();

// curl http://localhost:3003/users

users.get('/', (req,res)=>{
  User.find({}, (err, myUser) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(myUser);
    }
  });
})

// curl -X POST -H "Content-Type:application/json" -d '{"username":"bob","email":"111@1","password":"111"}' http://localhost:3003/users

users.post(`/`, (req,res)=>{
  
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(req.body,(err,newUser)=>{
    if(err){
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(newUser);
    }
  })
})

module.exports = users;

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please input required details");
//   }

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("Email is already in use");
//   }

//   //Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   //Create user
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }
// });

// const getUser = asyncHandler(async (req, res) => {
//   const { _id, name, email } = await User.findById(req.user.id);

//   res.status(200).json({
//     id: _id,
//     name,
//     email,
//   });
// });

// //Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUser,
// };
