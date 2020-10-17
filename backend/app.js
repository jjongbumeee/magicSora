const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cors_origin = [`http://localhost:8080`];
const express = require('express');
const auth = require('./routes/auth')();
const app = express();

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const adminRouter = require('./routes/admin');

// cors dev setting
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// cors setting
app.use(
    cors({
        origin: cors_origin,
        credentials: true,
    })
);


// view engine setup
app.set('views', path.join(__dirname, 'views')); //__dirname current directory name
app.set('view engine', 'pug');

// logger
app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth.initialize());

// Router 설정
app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/admin', adminRouter);

// sequelize
const sequelize = require("./models").sequelize;
sequelize.sync();


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