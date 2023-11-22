// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("./data/database");
const homeRoute = require("./src/routes/homeRouter");
const storiesRoutes = require("./src/routes/storiesRouter");
const genresRoutes = require("./src/routes/genresRouter");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use("/stories", storiesRoutes);
app.use("/stories/compose", storiesRoutes);
app.use("/genres", genresRoutes);
app.use("/", homeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
