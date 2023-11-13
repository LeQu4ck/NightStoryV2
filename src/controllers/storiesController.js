const getAllStories = (req, res) => {
  res.send("Get all stories");
};

const getStoryById = (req, res) => {
  const storyID = req.params.storyID;
  res.send(`Get story with ID ${storyID}`);
};

module.exports = { getAllStories, getStoryById };
