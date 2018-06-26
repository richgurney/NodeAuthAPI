const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
);

PostSchema.pre('save', (next) => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('post', PostSchema);
