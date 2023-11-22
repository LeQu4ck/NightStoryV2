const express = require("express");
const router = express.Router();
const {
  getGenres,
  getCreateGenre,
  getUpdateGenre,
  postGenre,
  deleteGenre,
} = require("../controllers/genresController");

router.get("/", getGenres);
router.get("/new-genre", getCreateGenre);
router.post("/post-genre", postGenre);
router.get("/edit/:genreID", getUpdateGenre);
router.get("/delete/:genreID", deleteGenre);

module.exports = router;
