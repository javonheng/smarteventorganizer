const router = require('express').Router() //express router
let Saved = require('../models/savepreset.model') //Mongoose model that is created

//First route first endpoint that handles incoming HTTP GET request on /users url path
router.route('/').get((req, res) => {
  Saved.find()//.populate('updatenews') //Mongoose method to get a list of all the users from the DB
  .then(preset => res.json(preset)) //return in json format
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { //post request
  const postid = req.body.postid
  const pageid = req.body.pageid
  const pagename = req.body.pagename

  //create new instance of user
  const newpresets = new Saved({
    postid,
    pageid,
    pagename,
  })

  newpresets.save()   //save exercises to db
    .then(() => res.json('Saved!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

//Read Component
router.route('/:id').get((req, res) => { //object id created by MongoDB automatically
  Saved.findById(req.params.id) //get id from url directly and finding by ID
    .then(presets => res.json(presets)) //return the exercise by json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Component
router.route('/:id').delete((req, res) => {
  Saved.findByIdAndDelete(req.params.id)
    .then(() => res.json('Preset deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update Component
router.route('/update/:id').post((req, res) => {
  Saved.findById(req.params.id)
    .then(preset => {
      preset.postid = req.body.postid
      preset.pageid = req.body.pageid
      preset.pagename = req.body.pagename

      preset.save()
        .then(() => res.json('Preset updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete()
module.exports = router //exporting router
