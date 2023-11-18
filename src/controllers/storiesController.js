const testStories = [
  {
    id: 1,
    title: "The Adventure Begins",
    genre: "Thriller",
    preview: "Short resume",
    content: "Once upon a time...",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Mystery in the Moonlight",
    genre: "Romance",
    preview: "Short resume",
    content: "In the eerie glow of the moon...",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Lost in the Wilderness",
    genre: "Fantasy",
    preview: "Short resume",
    content: "Far away from civilization...",
    author: "Alex Johnson",
  },
  {
    id: 4,
    title: "Lost in the Woods",
    genre: "Fantasy",
    preview: "Short resume",
    content: "Far away from civilization...",
    author: "Alex Johnson",
  },
];

const getStories = (req, res) => {
  res.render("stories");
};

const getStoriesByGenre = (req, res) => {
  const genre = req.params.filter || "All";

  let filteredStories;

  if (genre === "All") {
    filteredStories = testStories;
  } else {
    filteredStories = testStories.filter((story) => story.genre === genre);
  }

  res.json({ stories: filteredStories });
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

module.exports = { getStories, getStoryByID, getStoriesByGenre };
