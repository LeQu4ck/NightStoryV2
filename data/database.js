const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Models
require("../src/models/storyModel");
require("../src/models/genresModel");
