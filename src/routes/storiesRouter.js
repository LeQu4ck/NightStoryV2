const express = require("express");
const router = express.Router();
const {
  getAllStories,
  getStoryById,
} = require("../controllers/storiesController");

router.param('storyId', (req, res, next, storyId) => {
  req.storyId = storyId;
  next();
});

router.get("/", getAllStories);
router.get("/:storyID", getStoryById);

module.exports = router;
