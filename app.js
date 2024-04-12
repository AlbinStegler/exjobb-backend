require('dotenv').config()
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');

let createError = require('http-errors');
let bodyParser = require('body-parser');
let path = require('path');

//Routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let eventRouter = require('./routes/event');
let adminRouter = require('./routes/admin');
let pastRouter = require('./routes/past');

let app = express();
app.use(cors());

function validateApiKey(req, res, next) {
  try {
    let apiKey = req.get("apiKey");
    console.log(apiKey);
    console.log("APIKEY saved" + process.env.API_KEY);
    if (apiKey === process.env.API_KEY) {
      next();
    } else {
      console.log("No apiKey supplied");
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//Middleware
app.use(validateApiKey);
app.disable("x-powered-by");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/event', eventRouter)
app.use('/admin', adminRouter);
app.use('/past', pastRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
