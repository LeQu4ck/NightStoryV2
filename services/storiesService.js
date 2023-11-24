const Story = require("../src/models/storyModel");

const deleteStoriesForGenre = async (genreID) => {
  try {
    await Story.deleteMany({ genre: genreID });
    return "All stories were deleted successfully!";
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't delete stories.");
  }
};

module.exports = {
  deleteStoriesForGenre,
};
