const mongoose = require('mongoose')

const Schema = mongoose.Schema

const loginSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
//Create, Read, Update, Delete CRUD Application

const LoginMembers = mongoose.model('LoginMembers', loginSchema, 'logindata') //(anything, userSchema, collection name)
module.exports = LoginMembers
