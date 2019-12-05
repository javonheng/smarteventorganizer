const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newAttendeeSchema = new Schema ({
  name: { type: String, required: true }, //different data types
  pax: {type: Number, required: true},
  event: {type: String, required: true},
  remarks: { type: String, required: true},
  isPresent: { type: Boolean, required: true},
  //updatenews: [{ type: Schema.Types.ObjectId, ref: 'UpdateNews'}],
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const Attendee = mongoose.model('Attendee', newAttendeeSchema, 'newattendee') //(anything, userSchema)
module.exports = Attendee
