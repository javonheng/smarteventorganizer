const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rentalStatusSchema = new Schema ({
  company: { type: String, required: true },
  description: { type: String, required: true },
  percentage: { type: Number, required: true},
  //updatenews: [{ type: Schema.Types.ObjectId, ref: 'UpdateNews'}],
  }, {
  timestamps: true, //know when it is created or modified
})

//Create, Read, Update, Delete CRUD Application

const Rental = mongoose.model('Rental', rentalStatusSchema, 'rental') //(anything, userSchema)
module.exports = Rental
