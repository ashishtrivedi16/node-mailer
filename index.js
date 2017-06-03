var mailer = require('nodemailer'); // to send emails
var bodyParser = require('body-parser') // to get data from form and supply it to mailOptions
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get',function (req, res) {

  var transporter = mailer.createTransport({ 
    service : 'gmail', // if you are using gmail then make sure you have switched off Use secure apps options in account settings
    auth : {
      user: '-', // add your user name
      pass: '' // add your password
    }
  });

  console.log('Transporter created');

  var mailOptions = { // carries mail info
    fron: ' "Ashish" triashish7@gmail.com',
    to: req.query.to,  // body-parser gets data from form
    subject: req.query.subject,
    text: req.query.text,
    html: req.query.html // you can add additional html content too
  }

  console.log('Mail options set!');

  transporter.sendMail(mailOptions, function (error, response) { // sends the mail
    if(error){
      console.log(error);
      res.end("error")
    }else {
      console.log('message sent! ID: %s', response.messageId);
    }
  })
  res.send('<h1>Mail sent!!</h1>')
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
