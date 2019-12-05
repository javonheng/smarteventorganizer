const router = require('express').Router() //express router
let CheckList = require('../models/checklist.model') //Mongoose model that is created
let CreateEvent = require('../models/createevent.model')
//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  CheckList.find()//.populate('updatenews') //Mongoose method to get a list of all the users from the DB
  .then(CheckList => res.json(CheckList)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
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
  const newChecklist = new CheckList({
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

  newChecklist.save()   //save exercises to db
    .then(() => res.json('New Checklist added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  CheckList.findById(req.params.id) //get id from url directly and finding by ID
    .then(exercise => res.json(exercise)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  CheckList.findByIdAndDelete(req.params.id)
    .then(() => res.json('Checklist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update Component
router.route('/update/:id').post((req, res) => {
  CheckList.findById(req.params.id)
    .then(newChecklist => {
      newChecklist.budget = req.body.budget
      newChecklist.location = req.body.location
      newChecklist.agenda = req.body.agenda
      newChecklist.sponsorship = req.body.sponsorship
      newChecklist.marketing = req.body.marketing
      newChecklist.participants = req.body.participants
      newChecklist.permits = req.body.permits
      newChecklist.contractors = req.body.contractors
      newChecklist.risks = req.body.risks
      newChecklist.security = req.body.security
      newChecklist.services = req.body.services
      newChecklist.waste = req.body.waste
      newChecklist.traffic = req.body.traffic
      newChecklist.food = req.body.food
      newChecklist.siteplan = req.body.siteplan
      newChecklist.cleaning = req.body.cleaning
      newChecklist.others = req.body.others
      newChecklist.ontheday = req.body.ontheday

      newChecklist.save()
        .then(() => res.json('Checklist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
