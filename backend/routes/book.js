const express = require('express');
const router = express.Router();
const multer = require('multer');

const bodyParser = require("body-parser");
const book = require('../models').book;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static('uploads'));

// search
router.post("/bookSearch", async (req,res) => { // 책 이름으로 search하기 위한 select 문
    const name = req.body.query;
    await book.findAll({
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

router.post("/upload", upload.single('file'), async (req, res) => {
    const name = req.body.name;
    const auth = req.body.auth;
    const pub = req.body.pub;
    const price = req.body.price;
    const image = req.file.filename;
    await book.create({
        name: name,
        auth: auth,
        pub: pub,
        price: price,
        image: image
    }).then(book => {
        console.log("generated BOOK", book.name);
        res.send({});
    }).catch(err => {
        console.error(err);
    })
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
router.post("/bookDelete", async (req, res) => {
    const bid = req.body.bid;
    
    await book.destroy({
        where: {bid: bid}
    })
    .then(result => {
        res.send("삭제되었습니다.");
    })
    .catch(err => {
        console.error(err);
    });
})

// show book
router.get("/booktbl", async (req, res, next) => {
    await book.findAll().then(booktbl => {
    res.send(booktbl);
    })
    .catch(err => {
        console.error(err);
    });
});

module.exports = router;