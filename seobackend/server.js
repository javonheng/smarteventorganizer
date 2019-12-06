const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails
const mongoose = require('mongoose') //to connect to MongoDB
const dotenv = require('dotenv')
const passport = require("passport");

//dotenv.config()

const app = express(); //alias from the express function
const port = process.env.PORT || 4000

//sendgrid api key
sgMail.setApiKey('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');

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!
app.use(express.json())

app.post('/send-email', (req,res) => {
  res.send('Email Sent')
  //Get Variables from query string in the search bar
  const name = req.body.name
  const role = req.body.role
  const contact = req.body.contact
  const email = req.body.email
  const subject = req.body.subject
  const queries = req.body.queries

  //Sendgrid Data Requirements
    const msg = {
      to: 'jheng012@e.ntu.edu.sg',
      text: name,
      text: role,
      text: contact,
      from: email,
      subject: subject,
      html: queries,
  }
  //Send Email
  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      console.log(result)
    }
  })
  //.then((msg) => console.log(html));
})

app.post('/send-campaigns', (req,res) => {
  res.send('Emails Sent')
  //Get Variables from query string in the search bar
  const recipients = req.body.recipients
  const from = req.body.sender
  const subject = req.body.subject
  const html = req.body.html

  //Sendgrid Data Requirements
    const msg = {
      to: recipients,
      from: from,
      subject: subject,
      html: html,
  }
  //Send Email
  sgMail.sendMultiple(msg, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      console.log(result)
    }
  })
  //.then((msg) => console.log(html));
})


const uri = "mongodb+srv://javonheng:javonheng@smarteventorganizer-okapp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri || process.env.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true}
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

const createEventRouter = require('./routes/createevent')
//const createChecklistRouter = require("./routes/checklist");
const updateNewsRouter = require('./routes/updatenews')
const membersRouter = require('./routes/newmembers')
const agendasRouter = require('./routes/agenda')
const rentalStatusRouter = require('./routes/rentalstatus')
const attendeeRouter = require('./routes/attendee')
const savepresetRouter = require('./routes/savepreset')
const userslogin = require("./routes/userslogin")
const mediaitems = require("./mediaitems")
const allfiles = require("./allfiles")

app.use('/createeventapi', createEventRouter)
//app.use('/createchecklistapi', createChecklistRouter)
app.use('/updatenewsapi', updateNewsRouter)
app.use('/addmembersapi', membersRouter)
app.use('/addagendasapi', agendasRouter)
app.use('/rentalstatusapi', rentalStatusRouter)
app.use('/attendeesapi', attendeeRouter)
app.use('/savedpresetapi', savepresetRouter)
app.use('/mediaitems', mediaitems)
app.use('/allfiles', allfiles)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport config
require("./routes/passport")(passport);
// Routes
app.use("/userslogin", userslogin);

const path = require('path')
//Serve Static Assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('seo/build'))

  //
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'seo', 'build', 'index.html'))
  })
}
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
