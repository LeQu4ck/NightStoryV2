const testStories = [
  {
    id: 1,
    title: "The Adventure Begins",
    content: "Once upon a time...",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Mystery in the Moonlight",
    content: "In the eerie glow of the moon...",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Lost in the Wilderness",
    content: "Far away from civilization...",
    author: "Alex Johnson",
  },
];

const getAllStories = (req, res) => {
  res.send(testStories);
};

const getStoryByID = (req, res) => {
  const storyID = req.params.storyID;
  console.log(storyID);
  const result = testStories.find((story) => story.id == storyID);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Story not found" });
  }
};

module.exports = { getAllStories, getStoryByID };
