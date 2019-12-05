const router = require('express').Router() //express router
let UpdateNews = require('../models/updatenews.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  UpdateNews.find() //Mongoose method to get a list of all the users from the DB
  .then(updatenew => res.json(updatenew)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const news = req.body.news

  //create new instance of user
  const newUpdate = new UpdateNews({
    news,
  })

  newUpdate.save()   //save exercises to db
    .then(() => res.json('New news added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  UpdateNews.findById(req.params.id) //get id from url directly and finding by ID
    .then(exercise => res.json(exercise)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  UpdateNews.findByIdAndDelete(req.params.id)
    .then(() => res.json('New news deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Update Component
router.route('/update/:id').post((req, res) => {
  UpdateNews.findById(req.params.id)
    .then(exercise => {
      exercise.news = req.body.news

      exercise.save()
        .then(() => res.json('New news updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
