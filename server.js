const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

// const rateLimiter = require('./limiter');
const apiRoutes = require('./routes/api');

var port = process.env.PORT || 8080

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// app.use(rateLimiter);

// start the server
app.listen(port, function () {
  console.log(`Node server listeningn on port ${port}`);
});

// route our app
app.get('/', function (req, res) {
  res.json({ "message": "United Material Handling, INC | Private API" });
});

// Routes
app.use('/api/v1', apiRoutes);

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  if (err.status === 404)
    res.status(404).json({ message: "Not Found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});