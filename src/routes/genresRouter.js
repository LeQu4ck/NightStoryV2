const express = require("express");
const router = express.Router();
const {
  getGenres,
  getCreateGenre,
  postGenre,
} = require("../controllers/genresController");
const { route } = require("./homeRouter");

router.get("/", getGenres);
router.get("/new-genre", getCreateGenre);
router.post("/post-genre", postGenre);

module.exports = router;
