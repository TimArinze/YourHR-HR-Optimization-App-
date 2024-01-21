const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: String, required: true, trim: true, minlength: 3 },
  name: { type: String, required: true, trim: true, minlength: 3 },
  type: { type: String, required: true, trim: true, minlength: 3, enum: ['folder', 'file', 'image'] },
  isPublic: { type: Boolean, required: true, default: false, trim: true, minlength: 3 },
  folderName: { type: String, required: true, trim: true, minlength: 3 },
  // semi-colon after image is needed to end this statement within the function
  // as Base64 of the file content
  data: { type: String, required: function () { return this.type === 'file' || this.type === 'image'; }, trim: true, minlength: 3 },
  localPath: { type: String, required: function () { return this.type === 'file' || this.type === 'image'; }, trim: true, minlength: 3 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
