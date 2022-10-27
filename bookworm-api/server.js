/*======================
  DEPENDENCIES
======================*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookmarkController = require("./controllers/bookmarkController");


/*======================
  VARIABLES
======================*/

const app = express();
const PORT = 3003;
const whitelist = ["http://localhost:3000", "http://localhost:3003"];
const corsOption = {
  origin: whitelist,
};
const MONGODB_URI = "mongodb://localhost:27017/bookworm";

// test first, then put 'mongodb+srv://admin:admin@cluster0.7lqlv8z.mongodb.net/bookworm'

/*======================
  MIDDLE-WARE
======================*/

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
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



app.use(express.json());
app.use(cors(corsOption));
app.use("/", bookmarkController);
// app.use("/users", require("./routes/userRoutes"));

/*======================
  TO LISTEN
======================*/

app.listen(PORT, () => {
  console.log("Bookworm app is listening on port " + PORT);
});
