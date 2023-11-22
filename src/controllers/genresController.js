const Genre = require("../models/genresModel");

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();

    res.render("genres", { genres });
  } catch (error) {
    console.error("Error getting genres:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCreateGenre = (req, res) => {
  res.render("createGenre");
};

const getUpdateGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.genreID);
    res.render("editGenre", { genre });
  } catch (error) {
    console.error("Error getting genre for update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const postGenre = async (req, res) => {
  const { genreID, genreName } = req.body;

  try {
    if (genreID) {
      const existingGenre = await Genre.findById(genreID);

      if (!existingGenre) {
        return res.status(404).json({ message: "Genre not found" });
      }

      existingGenre.genreName = genreName;
      await existingGenre.save();

      return res.redirect("/genres");
    } else {
      const existingGenre = await Genre.findOne({ genreName });

      if (existingGenre) {
        return res.status(400).json({ message: "Genre already exists" });
      }

      const newGenre = new Genre({ genreName });
      await newGenre.save();

      return res.redirect("/genres/new-genre");
    }
  } catch (error) {
    console.error("Error creating/updating genre:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteGenre = (req, res) => {
  const genreID = req.body.genreID;

  try {
    
  } catch (error) {
    console.error("Error creating/updating genre:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getGenres,
  getCreateGenre,
  getUpdateGenre,
  postGenre,
  deleteGenre,
};
