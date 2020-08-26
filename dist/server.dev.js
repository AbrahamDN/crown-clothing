"use strict";

var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

var path = require('path');

var compression = require('compression');

var enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var app = express();
var port = process.env.PORT || 5000;
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(enforce.HTTPS({
  trustProtoHeader: true
}));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express["static"](path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, function (error) {
  if (error) throw error;
  console.log('Server running on port' + port);
});
app.get('/service-worker.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});
app.post('/payment', function (req, res) {
  var body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };
  stripe.charges.create(body, function (stripeErr, stripeRes) {
    if (stripeErr) {
      res.status(500).send({
        error: stripeErr
      });
    } else {
      res.status(200).send({
        success: stripeRes
      });
    }
  });
});