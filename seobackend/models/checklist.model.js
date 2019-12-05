const mongoose = require('mongoose')
let CreateEvent = require('../models/createevent.model')

const Schema = mongoose.Schema

const checklistSchema = new Schema ({
  budget: { type: Boolean, required: true }, //different data types
  location: {type: Boolean, required: true}, //4 fields
  agenda: {type: Boolean, required: true},
  sponsorship: {type: Boolean, required: true},
  marketing: { type: Boolean, required: true},
  participants: { type: Boolean, required: true},
  permits: { type: Boolean, required: true},
  contractors: { type: Boolean, required: true},
  risks: { type: Boolean, required: true},
  security: { type: Boolean, required: true},
  services: { type: Boolean, required: true},
  waste: { type: Boolean, required: true},
  traffic: { type: Boolean, required: true},
  food: { type: Boolean, required: true},
  siteplan: { type: Boolean, required: true},
  cleaning: { type: Boolean, required: true},
  others: { type: Boolean, required: true},
  ontheday: { type: Boolean, required: true},
  event: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreateEvent'
  }]
  //updatenews: [{ type: Schema.Types.ObjectId, ref: 'UpdateNews'}],
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const CheckList = mongoose.model('CheckList', checklistSchema, 'checklist') //(anything, userSchema)
module.exports = CheckList
