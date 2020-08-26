let createError = require('http-errors');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let express = require('express');

let app = express();
app.use(cors());
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let bookRouter = require('./routes/book');
let adminRouter = require('./routes/admin');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views')); //__dirname current directory name
app.set('view engine', 'pug');

// logger
app.use(logger('dev'));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Router 설정
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);
app.use('/admin', adminRouter);

// catch 404(not found) and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;