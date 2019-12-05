const router = require('express').Router() //express router
let NewMembers = require('../models/members.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  NewMembers.find() //Mongoose method to get a list of all the users from the DB
  .then(newmembers => res.json(newmembers)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const name = req.body.name
  const company = req.body.company
  const role = req.body.role
  const contact = req.body.contact
  const email = req.body.email
  const isInternal = req.body.isInternal

  //create new instance of user
  const newDetails = new NewMembers({
    name,
    company,
    role,
    contact,
    email,
    isInternal,
  })

  newDetails.save()   //save exercises to db
    .then(() => res.json('New member added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  NewMembers.findById(req.params.id) //get id from url directly and finding by ID
    .then(exercise => res.json(exercise)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  NewMembers.findByIdAndDelete(req.params.id)
    .then(() => res.json('Member deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update Component
router.route('/update/:id').post((req, res) => {
  NewMembers.findById(req.params.id)
    .then(exercise => {
      exercise.name = req.body.name
      exercise.company = req.body.company
      exercise.role = req.body.role
      exercise.contact = req.body.contact
      exercise.email = req.body.email
      exercise.isInternal = req.body.isInternal

      exercise.save()
        .then(() => res.json('New member updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
