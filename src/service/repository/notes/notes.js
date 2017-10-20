const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  information: [{}],
  color: String,
  priority: {
    type: Number,
    default: 1,
  },
  whiteboardId: String,
},
{ timestamps: {} });

module.exports = mongoose.model('note', noteSchema);
