// app.js
const express = require("express");
const app = express();
const homeRoute = require("./src/routes/homeRouter");
const storiesRoutes = require("./src/routes/storiesRouter");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", homeRoute);
app.use("/stories", storiesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
