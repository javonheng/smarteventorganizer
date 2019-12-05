const mongoose = require('mongoose')

const Schema = mongoose.Schema

const membersSchema = new Schema ({
  name: { type: String, required: true }, //different data types
  company: { type: String, required: true},
  role: {type: String, required: true}, //4 fields
  contact: {type: Number, required: true},
  email: {type: String, required: true},
  isInternal: { type: String, required: true},
  fileId: { type: Schema.Types.ObjectId },
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const NewMembers = mongoose.model('NewMembers', membersSchema, 'members') //(anything, userSchema, collection name)
module.exports = NewMembers
