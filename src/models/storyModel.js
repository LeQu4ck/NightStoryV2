const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: String,
  author: String, 
  preview: String,
  genre: String,
  content: String,
  coverImage: String,  
  comments: [
    {
      name: String,
      body: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
