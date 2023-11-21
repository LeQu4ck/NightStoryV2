const testStories = [
  {
    id: 1,
    title: "The Adventure Begins",
    genre: "Thriller",
    preview: "Short resume",
    publishDate: "10-10-2023",
    content: "Once upon a time...",
    author: "John Doe",
    comments: [
      {
        name: "User1",
        date: "2023-11-15",
        body: "Great story!",
      },
      {
        name: "User2",
        date: "2023-11-16",
        body: "I enjoyed it!",
      },
    ],
  },
  {
    id: 2,
    title: "Mystery in the Moonlight",
    genre: "Romance",
    preview: "Short resume",
    publishDate: "10-10-2023",
    content: "In the eerie glow of the moon...",
    author: "Jane Smith",
    comments: [
      {
        name: "User3",
        date: "2023-11-15",
        body: "Beautiful!",
      },
      {
        name: "User4",
        date: "2023-11-16",
        body: "Captivating!",
      },
    ],
  },
  {
    id: 3,
    title: "Lost in the Wilderness",
    genre: "Fantasy",
    preview: "Short resume",
    publishDate: "10-10-2023",
    content: "Far away from civilization...",
    author: "Alex Johnson",
    comments: [],
  },
  {
    id: 4,
    title: "Lost in the Woods",
    genre: "Fantasy",
    preview: "Short resume",
    publishDate: "10-10-2023",
    content: "Far away from civilization...",
    author: "Alex Johnson",
    comments: [
      {
        name: "User5",
        date: "2023-11-17",
        body: "Interesting!",
      },
    ],
  },
];
const genres = [
  "All",
  "Novel",
  "Horror",
  "Science Fiction",
  "Romance",
  "Fantasy",
  "Paranormal",
  "Mystery",
  "Adventure",
  "Thriller",
  "Drama",
  "Folklore",
];

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getStories = (req, res) => {
  res.render("stories", { genres });
};
const getCompose = (req, res) => {
  res.render("compose", { genres });
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
  const result = testStories.find((story) => story.id == storyID);

  if (result) {
    res.render("readStory", { story: result });
  } else {
    res.status(404).json({ message: "Story not found" });
  }
};

const postStory = (req, res) => {
  upload.single("ImgInp")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file.");
    }

    const { title, author, preview, Genres, newGenre, body } = req.body;

    const selectedGenre = newGenre ? newGenre : Genres;

    if (!genres.includes(selectedGenre)) {
      genres.push(selectedGenre);
    }
    const story = {
      id: testStories.length + 1,
      title: title,
      genre: selectedGenre,
      preview: preview,
      content: body,
      author: author,
      comments: [],
      publishDate: new Date().toLocaleDateString(),
    };

    testStories.push(story);
    console.log(testStories[testStories.length - 1]);

    res.redirect("/stories/compose");
  });
};

const postComment = (req, res) => {
  const { storyID, commentName, newComment } = req.body;

  const comment = {
    name: commentName,
    body: newComment,
    date: new Date().toLocaleDateString(),
  };

  const storyIndex = testStories.findIndex(
    (story) => story.id === parseInt(storyID)
  );

  if (storyIndex !== -1) {
    testStories[storyIndex].comments.push(comment);
    console.log(testStories[storyIndex]);
  }
  res.redirect(`/stories/${storyID}`);
};

module.exports = {
  getStories,
  getStoryByID,
  getStoriesByGenre,
  getCompose,
  postStory,
  postComment,
};
