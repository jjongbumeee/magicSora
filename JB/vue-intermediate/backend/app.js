var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//DB parser
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/form_receiver", (request, response) => {
  const id = request.body.id;
  const password = request.body.password;
  console.log(id, password);
  res.header("Access-Control-Allow-Origin", "*");
    article.create({ id: id, password: password }).then(admin => {
      console.log("generated ID", admin.id);
    });
  response.send(id + "///" + password);
});

app.get("/admintbl", (req, res) => {
  admin.findAll().then(admintbl => {
    res.send(admintbl);
  });
});

app.options("/admintbl", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send();
});


const sequelize = new Sequelize("o2", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

const admin = sequelize.define(
  "admin",
  {
    // attributes
    id: {
      type: Sequelize.STRING,
      allowNUll: false,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNULL: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
    // options
  }
);

sequelize.sync({ alter: true });


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
// catch 404 and forward to error handler
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
