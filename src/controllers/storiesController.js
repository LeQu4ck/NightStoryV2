const { getGenres, checkGenre } = require("../../services/genreService");
const Story = require("../models/storyModel");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "coverImages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const getStories = async (req, res) => {
  try {
    const genres = await getGenres();
    res.render("stories", { genres });
  } catch (error) {
    console.error("Error fetching stories and genres:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getCompose = async (req, res) => {
  try {
    const genres = await getGenres();
    res.render("compose", { genres });
  } catch (error) {
    console.error("Error fetching stories and genres:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getStoriesByGenre = async (req, res) => {
  const genre = req.params.filter || "All";

  //console.log(genre)
  try {
    let filteredStories;

    if (genre === "All") {
      filteredStories = await Story.find().populate('genre');
    } else {
      filteredStories = await Story.find({ genre: genre }).populate('genre');
    }
    
    res.json({ stories: filteredStories });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStoryByID = async (req, res) => {
  const storyID = req.params.storyID;
  ///manage nb of views
  try {
    const story = await Story.findById({ _id: storyID }).populate('genre');
    if (story) {

      story.nbOfviews +=1;
      await story.save()
      
      res.render("readStory", { story: story });
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEditStory = async (req, res) => {
  const storyID = req.params.storyID;
  try {
    const story = await Story.findById({ _id: storyID });
    const genres = await getGenres();
    if (story) {
      res.render("editStory", { story: story, genres });
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postStory = async (req, res) => {
  upload.single("ImgInp")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file.");
    }

    const { storyID, title, author, preview, Genres, newGenre, body } =
      req.body;

    let genreID = "";

    if (!Genres) {
      genreID = await checkGenre(newGenre);
    } else {
      genreID = Genres;
    }

    let coverImagePath = "";

    if (req.file) {
      coverImagePath = `/coverImages/${req.file.filename}`;
    }

    if (storyID) {
      try {
        let updateFields = {
          title,
          preview,
          genre: genreID,
          content: body,
        };

        if (req.file) {
          updateFields.coverImage = coverImagePath;
        }

        await Story.findByIdAndUpdate(storyID, updateFields, { new: true });

        res.redirect(`/stories/${storyID}`);
      } catch (error) {
        console.error("Error updating story:", error);
        res.status(500).json({ error: "Error updating story." });
      }
    } else {
      try {
        const newStory = new Story({
          title,
          genre: genreID,
          preview,
          content: body,
          author,
          coverImage: coverImagePath,
          comments: [],
          publishDate: new Date().toLocaleDateString(),
        });

        const savedStory = await newStory.save();

        res.redirect(`/stories/${savedStory._id}`);
      } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ error: "Error creating story." });
      }
    }
  });
};

const postComment = async (req, res) => {
  const { storyID, commentName, newComment } = req.body;

  const comment = {
    name: commentName,
    body: newComment,
    date: new Date().toLocaleDateString(),
  };

  try {
    const story = await Story.findOneAndUpdate(
      { _id: storyID },
      { $push: { comments: comment } },
      { new: true }
    );

    if (story) {
      res.redirect(`/stories/${storyID}`);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteStory = async (req, res) => {
  const storyID = req.params.storyID;

  try {
    await Story.deleteOne({ _id: storyID });
    res.redirect("/stories");
  } catch (error) {
    console.error("Error creating/updating genre:", error);
    return res.status(500).json({ message: "Internal server error" });
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
