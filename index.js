var mailer = require('nodemailer');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get',function (req, res) {

  var transporter = mailer.createTransport({
    service : 'gmail',
    auth : {
      user: '-',
      pass: ''
    }
  });

  console.log('Transporter created');

  var mailOptions = {
    fron: ' "Ashish" triashish7@gmail.com',
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text,
    html: req.query.html
  }

  console.log('Mail options set!');

  transporter.sendMail(mailOptions, function (error, response) {
    if(error){
      console.log(error);
      res.end("error")
    }else {
      console.log('message sent! ID: %s', response.messageId);
    }
  })
  res.send('<h1>Mail sent!!</h1>')
});

var server = app.listen(7777);
console.log("Server started!");
