const Genre = require("../src/models/genresModel");

const getGenres = async () => {
  try {
    const genres = await Genre.find();
    return genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

const checkGenre = async (genre) => {
  try {
    const existingGenre = await Genre.findOne({ genreName: genre });

    if (!existingGenre) {
      const newGenreDocument = new Genre({ genreName: genre });
      await newGenreDocument.save();
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return false;
  }
};

module.exports = { getGenres, checkGenre };
