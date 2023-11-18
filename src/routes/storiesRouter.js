const express = require("express");
const router = express.Router();
const {
  getStories,
  getStoryByID,
  getStoriesByGenre,
} = require("../controllers/storiesController");

router.get("/", getStories);
router.get("/:storyID", getStoryByID);
router.get("/filter/:filter", getStoriesByGenre);

module.exports = router;
