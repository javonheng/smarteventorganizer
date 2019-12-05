const mongoose = require('mongoose')

const Schema = mongoose.Schema

const createAgendaSchema = new Schema ({
  title: { type: String, required: true }, //different data types
  start: {type: Date, required: true}, //4 fields
  end: {type: Date, required: true},
  desc: { type: String, required: true},
  //updatenews: [{ type: Schema.Types.ObjectId, ref: 'UpdateNews'}],
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const CreateAgenda = mongoose.model('CreateAgenda', createAgendaSchema, 'createagenda') //(anything, userSchema)
module.exports = CreateAgenda
