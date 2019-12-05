const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savepresetSchema = new Schema ({
  postid: { type: String, required: true },
  pageid: { type: String, required: true },
  pagename: { type: String, required: true },
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const Saved = mongoose.model('Saved', savepresetSchema, 'savedpresets') //(anything, userSchema)
module.exports = Saved
