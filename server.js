/*======================
  DEPENDENCIES
======================*/

const express = require("express");
const session = require(`express-session`);
const mongoose = require("mongoose");
const cors = require("cors");
const bookmarkController = require("./controllers/bookmarkController.js");
const userController = require("./controllers/userController.js");
const sessionController = require("./controllers/sessionController.js")
const checkUser = require(`./middleware/checkUser.js`)
require('dotenv').config()

/*======================
  VARIABLES
======================*/

const app = express();
const PORT = process.env.PORT || 3003;
const whitelist = ["http://localhost:3000", "http://localhost:3003",'http://localhost:' + process.env.PORT,"https://bookworm-2022-app.herokuapp.com/"];
const corsOption = {
  origin: whitelist,
};

const MONGODB_URI = process.env.MONGODB_URI;

/*======================
  MIDDLE-WARE
======================*/

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => { // Executed once we establish connection with our MongoDB
  console.log("Connected to Mongoose DB");
});

mongoose.connection.on("err", () => {
  console.log("Error connecting to your database");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});


app.use(session({
  secret:"fdaff2SDdc2f3fdfSDHNU",
  resave: false,
  saveUninitialized: false
}))
app.use(express.json());
app.use(cors(corsOption));
app.use(checkUser);
app.use("/api/bookmarks", bookmarkController);
app.use("/api/users", userController);
app.use('/api/sessions', sessionController);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  // app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname + '../bookworm-frontend/build/index.html'));
  // });
 }

/*======================
  TO LISTEN
======================*/

app.listen(PORT, () => {
  console.log("Bookworm app is listening on port " + PORT);
});
