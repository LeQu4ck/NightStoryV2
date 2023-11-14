const express = require("express");
const router = express.Router();
const {
  getAllStories,
  getStoryByID,
} = require("../controllers/storiesController");

router.get("/", getAllStories);
router.get("/:storyID", getStoryByID);

module.exports = router;
