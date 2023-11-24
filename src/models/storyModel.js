const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: String,
  author: String, 
  preview: String,
  genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
  content: String,
  coverImage: String,
  publishDate: String,  
  nbOfviews:{
    type:Number,
    default:0
  },
  comments: [
    {
      name: String,
      body: String,
      date: String,
    },
  ],
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
