const router = require('express').Router() //express router
let Attendee = require('../models/attendee.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  Attendee.find()//.populate('updatenews') //Mongoose method to get a list of all the users from the DB
  .then(newAttendee => res.json(newAttendee)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const name = req.body.name
  const event = req.body.event
  const pax = req.body.pax
  const remarks = req.body.remarks
  const isPresent = req.body.isPresent

  const newAttendee = new Attendee({
    name,
    event,
    pax,
    remarks,
    isPresent,
  })

  newAttendee.save()   //save exercises to db
    .then(() => res.json('Attendee added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  Attendee.findById(req.params.id) //get id from url directly and finding by ID
    .then(attendee => res.json(attendee)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  Attendee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Attendee deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update Component
router.route('/update/:id').post((req, res) => {
  Attendee.findById(req.params.id)
    .then(attendee => {
      attendee.name = req.body.name
      attendee.event = req.body.event
      attendee.pax = req.body.pax
      attendee.remarks = req.body.remarks
      attendee.isPresent = req.body.isPresent

      attendee.save()
        .then(() => res.json('Attendee details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
