const router = require('express').Router() //express router
let Rental = require('../models/rental.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  Rental.find()//.populate('updatenews') //Mongoose method to get a list of all the users from the DB
  .then(createevent => res.json(createevent)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const company = req.body.company
  const percentage = req.body.percentage
  const description = req.body.description
  //const updatenews = updatenews._id

  //create new instance of user
  const newRental = new Rental({
    company,
    description,
    percentage,
  })

  newRental.save()   //save exercises to db
    .then(() => res.json('New Rental Status added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  Rental.findById(req.params.id) //get id from url directly and finding by ID
    .then(status => res.json(status)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  Rental.findByIdAndDelete(req.params.id)
    .then(() => res.json('Rental Company deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update Component
router.route('/update/:id').post((req, res) => {
  Rental.findById(req.params.id)
    .then(rental => {
      rental.company = req.body.company
      rental.percentage = req.body.percentage
      rental.description = req.body.description

      rental.save()
        .then(() => res.json('Rental Status updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
