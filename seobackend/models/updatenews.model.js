const mongoose = require('mongoose')

const Schema = mongoose.Schema

const updateNewsSchema = new Schema ({
  news: { type: String, required: true }, //different data types
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const UpdateNews = mongoose.model('UpdateNews', updateNewsSchema, 'newsUpdate') //(anything, userSchema, collection name)
module.exports = UpdateNews
