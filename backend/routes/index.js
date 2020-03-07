var express = require('express');
var router = express.Router();
var multer = require('multer');
var router = express();
var db_config = require('../environment.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static('uploads'));

const sequelize = new Sequelize("o2", db_config.user, db_config.password, {
  host: db_config.host,
  port: db_config.port,
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
  },
  
);
const book = sequelize.define(
  "book",
  {

    bid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNULL: false,
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
      type: Sequelize.STRING,
      allowNULL: false
      
    }
  },
  {
    freezeTableName: true,
    timeStamps: true
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

//upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename : (req, file, cb) => {
    const originalFileName = file.originalname.split('.');
    let fileName = 'none';
    if(originalFileName.length > 0) {
      fileName = `${originalFileName[0]}-${Date.now()}.${originalFileName[1]}`;
    }
    cb(null, fileName)
  }
});
const upload = multer({
  storage: storage,
})


router.post("/upload", upload.single('file'), (req, res) => {
  //res.json({ file: req.file });
  const name = req.body.name;
  const auth = req.body.auth;
  const pub = req.body.pub;
  const price = req.body.price;
  const image = req.file.filename;
  book.create({
    name: name,
    auth: auth,
    pub: pub,
    image: image
  }).then(book => {
    console.log("generated BOOK", book.name);
  });
  res.send('fuck')
});

router.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: `Too large. MAx size is ${MAX_SIZE / 1000}K` });
  }
})





module.exports = router;