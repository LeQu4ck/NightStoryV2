const Story = require('../models/storyModel');

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

const getEditStory = (req, res) => {
  const storyID = req.params.storyID;
  const story = testStories.find((story) => story.id == storyID);

  if (story) {
    res.render("editStory", { story: story, genres });
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

    const { storyID, title, author, preview, Genres, newGenre, body } =
      req.body;

    const selectedGenre = newGenre ? newGenre : Genres;

    if (!genres.includes(selectedGenre)) {
      genres.push(selectedGenre);
    }

    if (storyID) {
      const story = testStories.find((s) => s.id == storyID);

      if (story) {
        story.title = title;
        story.preview = preview;
        story.genre = selectedGenre;
        story.content = body;

        res.redirect(`/stories/${storyID}`);
      }
    } else {
      const story = {
        id: testStories[testStories.length - 1].id + 1,
        title: title,
        genre: selectedGenre,
        preview: preview,
        content: body,
        author: author,
        comments: [],
        publishDate: new Date().toLocaleDateString(),
      };
      testStories.push(story);

      res.redirect("/stories/compose");
    }
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

const deleteStory = (req, res) => {
  const storyID = parseInt(req.params.storyID, 10);
  const storyIndex = testStories.findIndex((story) => story.id === storyID);

  if (storyIndex !== -1) {
    testStories.splice(storyIndex, 1);
    res.redirect("/stories");
  } else {
    res.status(404).json({ message: "Story not found" });
  }
};

module.exports = {
  getStories,
  getStoryByID,
  getStoriesByGenre,
  getCompose,
  getEditStory,
  postStory,
  postComment,
  deleteStory,
};
