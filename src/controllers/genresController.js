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

const postGenre = async (req, res) => {
  const { genreName } = req.body;

  try {
    const existingGenre = await Genre.findOne({ genreName });

    if (existingGenre) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const newGenre = new Genre({ genreName });
    console.log(newGenre)
    await newGenre.save();

    res
      .status(201)
      .json({ message: "Genre created successfully", genre: newGenre })
      .redirect("/genres/new-genre");
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getGenres,
  getCreateGenre,
  postGenre,
};
