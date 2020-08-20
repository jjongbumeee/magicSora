var express = require('express');
var router = express.Router();
var multer = require('multer');
var db_config = require('../environment.json');

const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const { and } = require('sequelize');
const Op = Sequelize.Op;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static('uploads'));

// db orm sequelize
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
            allowNULL: true

        }
    },
    {
        freezeTableName: true,
        timeStamps: true
        // options
    }
);
sequelize.sync({ alter: true });

// search
router.post("/bookSearch", (req,res) => { // 책 이름으로 search하기 위한 select 문
    const name = req.body.query;
    book.findAll({
        where: { name: { [Op.like] : "%" + name  + "%" } },
        order: [['bid', 'ASC']]
    })
    .then(books => {
        res.send(books);
    })
    .catch(err => {
        console.log(err);
    })
})

// upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const originalFileName = file.originalname.split('.');
        let fileName = 'none';
        if (originalFileName.length > 0) {
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
        price: price,
        image: image
    }).then(book => {
        console.log("generated BOOK", book.name);
    });
    res.header("Access-Control-Allow-Origin", "*");
});

router.use(function (err, req, res, next) {
    if (err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({ error: "Only images are allowed" });
        return;
    }
    if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: `Too large. MAX size is ${MAX_SIZE / 1000}K` });
    }
})

// delete
router.post("/bookDelete", (req, res) => {
    const bid = req.body.bid;
    
    book.destroy({
        where: {bid: bid}
    })
    .then(result => {
        res.send("삭제");
    })
    .catch(err => {
        console.error(err);
    });
})


// login
router.post("/adminLogin", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    console.log(id, password);
    //res.header("Access-Control-Allow-Origin", "*");
    const result = await admin.findOne({
        where: {id: id}
    });

    const dbpassword = result.dataValues.password;
    // salt와 해싱 추가

    if(dbpassword === password) {
        console.log("비밀번호 일치");
        // 쿠키
        res.cookie("admin", id, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        });
        res.redirect("/admin");
    }
    else {
        console.log("비밀번호 불일치");
        res.redirect("/");
    }
});

// show book
router.get("/booktbl", (req, res) => {
    book.findAll().then(booktbl => {
        res.send(booktbl);
    });
});

module.exports = router;