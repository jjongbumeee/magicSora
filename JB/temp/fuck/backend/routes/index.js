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
const book = sequelize.define(
  "book",
  {
    bid: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNULL: false,

      primaryKey: true
    },
    auth: {
      type: Sequelize.STRING,
      allowNULL: false
    },
    pub: {
      type: Sequelize.STRING,
      allowNULL: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNULL: false
    },
    image: {
      type: Sequelize.BLOB('long')
    }
  },
  {
    freezeTableName: true,
    timestamps: true
    // options
  }
);
sequelize.sync({ alter: true });



router.post("/admin_receiver", (request, response) => {
  const id = request.body.id;
  const password = request.body.password;
  console.log(id, password);
  //res.header("Access-Control-Allow-Origin", "*");
  admin.create({ id: id, password: password }).then(admin => {
    console.log("generated ID", admin.id);
  });
  response.send(id + "///" + password);
});

router.post("/book_receiver", (request, response) => {
  const name = request.body.name;
  const auth = request.body.auth;
  const pub = request.body.pub;
  const price = request.body.price;
  const image = request.body.image;
  //res.header("Access-Control-Allow-Origin", "*");
  book.create({
    name: name,
    auth: auth,
    pub: pub,
    price: price,
    image: image
   }).then(book => {
    console.log("generated BOOK", book.name);
  });
  response.send(name + "///" + auth + '///' + pub + '///' + price + '///' + image);
});


router.get("/booktbl", (req, res) => {
  book.findAll().then(booktbl => {
    res.send(booktbl);
  });
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

router.options("/booktbl", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send();
});




module.exports = router;