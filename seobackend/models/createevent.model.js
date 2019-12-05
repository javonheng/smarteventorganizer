const mongoose = require('mongoose')
let CheckList = require('../models/checklist.model')

const Schema = mongoose.Schema

const createEventSchema = new Schema ({
  name: { type: String }, //different data types
  startDate: {type: Date}, //4 fields
  endDate: {type: Date},
  searchNames: {type: String },
  description: { type: String },
  budget: { type: Boolean}, //different data types
  location: {type: Boolean}, //4 fields
  agenda: {type: Boolean},
  sponsorship: {type: Boolean},
  marketing: { type: Boolean },
  participants: { type: Boolean},
  permits: { type: Boolean},
  contractors: { type: Boolean},
  risks: { type: Boolean},
  security: { type: Boolean },
  services: { type: Boolean },
  waste: { type: Boolean },
  traffic: { type: Boolean },
  food: { type: Boolean },
  siteplan: { type: Boolean },
  cleaning: { type: Boolean },
  others: { type: Boolean },
  ontheday: { type: Boolean },
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const CreateEvent = mongoose.model('CreateEvent', createEventSchema, 'createevents') //(anything, userSchema)
module.exports = CreateEvent
