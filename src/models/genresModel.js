const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  genreName: { type: String, required: true, unique: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

genreSchema.index({ genreName: 1, _id: 1 }, { unique: true });

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;