const router = require('express').Router() //express router
let CreateEvent = require('../models/createevent.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  CreateEvent.find()//.populate('updatenews') //Mongoose method to get a list of all the users from the DB
  .then(createevent => res.json(createevent)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const name = req.body.name
  const startDate = Date.parse(req.body.startDate)
  const endDate = Date.parse(req.body.endDate)
  const searchNames = req.body.searchNames
  const description = req.body.description
  const budget = req.body.budget
  const location = req.body.location
  const agenda = req.body.agenda
  const sponsorship = req.body.sponsorship
  const marketing = req.body.marketing
  const participants = req.body.participants
  const permits = req.body.permits
  const contractors = req.body.contractors
  const risks = req.body.risks
  const security = req.body.security
  const services = req.body.services
  const waste = req.body.waste
  const traffic = req.body.traffic
  const food = req.body.food
  const siteplan = req.body.siteplan
  const cleaning = req.body.cleaning
  const others = req.body.others
  const ontheday = req.body.ontheday

  //create new instance of user
  const newEvent = new CreateEvent({
    name,
    startDate,
    endDate,
    searchNames,
    description,
    budget,
    location,
    agenda,
    sponsorship,
    marketing,
    participants,
    permits,
    contractors,
    risks,
    security,
    services,
    waste,
    traffic,
    food,
    siteplan,
    cleaning,
    others,
    ontheday
  })

  newEvent.save()   //save exercises to db
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  CreateEvent.findById(req.params.id) //get id from url directly and finding by ID
    .then(exercise => res.json(exercise)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Read Component with Populate
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  CreateEvent.findById(req.params.id) //get id from url directly and finding by ID
    .populate('checklist').exec((err, checklist) => {

    })
    .then(exercise => res.json(exercise)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  CreateEvent.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component with Populate
router.route('/:id').delete((req, res) => {
  CreateEvent.findByIdAndDelete(req.params.id)
  .populate('checklist').exec((err, checklist) => {
    checklist.checklist = checklist.checklist.filter(tag => tag != null);
  })
    .then(() => res.json('Checklist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update Component
router.route('/update/:id').post((req, res) => {
  CreateEvent.findById(req.params.id)
    .then(exercise => {
      exercise.name = req.body.name
      exercise.startDate = Date.parse(req.body.startDate)
      exercise.endDate = Date.parse(req.body.endDate)
      exercise.searchNames = req.body.searchNames
      exercise.description = req.body.description
      exercise.budget = req.body.budget
      exercise.location = req.body.location
      exercise.agenda = req.body.agenda
      exercise.sponsorship = req.body.sponsorship
      exercise.marketing = req.body.marketing
      exercise.participants = req.body.participants
      exercise.permits = req.body.permits
      exercise.contractors = req.body.contractors
      exercise.risks = req.body.risks
      exercise.security = req.body.security
      exercise.services = req.body.services
      exercise.waste = req.body.waste
      exercise.traffic = req.body.traffic
      exercise.food = req.body.food
      exercise.siteplan = req.body.siteplan
      exercise.cleaning = req.body.cleaning
      exercise.others = req.body.others
      exercise.ontheday = req.body.ontheday

      exercise.save()
        .then(() => res.json('Event updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
