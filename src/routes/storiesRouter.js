const express = require("express");
const router = express.Router();
const {
  getStories,
  getStoryByID,
  getStoriesByGenre,
  getCompose,
  postStory,
  postComment
} = require("../controllers/storiesController");

router.get("/", getStories);
router.get("/compose", getCompose);
router.get("/:storyID", getStoryByID);
router.get("/filter/:filter", getStoriesByGenre);
router.post("/submit-story", postStory);
router.post("/new-comment", postComment)

module.exports = router;
