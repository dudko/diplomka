const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema({
  name: { type: String },
  definition: [],
  young: []
}, { timestamps: true });

const Face = mongoose.model('Face', faceSchema);

module.exports = Face;
