const router = require('express').Router() //express router
let CreateAgenda = require('../models/createagenda.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  CreateAgenda.find()//.populate('updatenews') //Mongoose method to get a list of all the users from the DB
  .then(createagenda => res.json(createagenda)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const title = req.body.title
  const start = Date.parse(req.body.start)
  const end = Date.parse(req.body.end)
  const desc = req.body.desc
  //const updatenews = updatenews._id

  //create new instance of user
  const newAgenda = new CreateAgenda({
    title,
    start,
    end,
    desc,
  })

  newAgenda.save()   //save exercises to db
    .then(() => res.json('Agenda added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  CreateAgenda.findById(req.params.id) //get id from url directly and finding by ID
    .then(agenda => res.json(agenda)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/latest').get((req, res) => {
  CreateAgenda.findOne({}, { sort: { 'created_at' : -1 }}, function(err, post) {
    console.log( post );
  })
})

//Delete Component
router.route('/:id').delete((req, res) => {
  CreateAgenda.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
