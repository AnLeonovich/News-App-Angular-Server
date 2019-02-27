const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  imageType: String
});

const News = mongoose.model('News', newsSchema);

module.exports = News
