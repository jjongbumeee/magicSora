var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

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



router.post("/form_receiver", (request, response) => {
  const id = request.body.id;
  const password = request.body.password;
  console.log(id, password);
  //res.header("Access-Control-Allow-Origin", "*");
  admin.create({ id: id, password: password }).then(admin => {
    console.log("generated ID", admin.id);
  });
  response.send(id + "///" + password);
});

router.get("/admintbl", (req, res) => {
  admin.findAll().then(admintbl => {
    res.send(admintbl);
  });
});

router.options("/admintbl", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send();
});




module.exports = router;