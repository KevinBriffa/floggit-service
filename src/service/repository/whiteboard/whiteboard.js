const mongoose = require('mongoose');

const whiteboardSchema = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('whiteboard', whiteboardSchema);
