const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails

const app = express(); //alias from the express function

//sendgrid api key
sgMail.setApiKey('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');

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!

// Welcome page of the express server:
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server");
})

  //Sendgrid Data Requirements
  const msg = {
      to: 'javonheng@hotmail.com',
      from: 'jheng012@e.ntu.edu.sg',
      subject: 'Test',
      text: 'Test text',
      html: '<strong>Hello!</strong>',
  }

  //Send Email
  sgMail.send(msg)

// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4001, () => console.log("Running on Port 4001"));
