let express = require("express");
let router = express.Router();
let db_config = require("../environment.json");

const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

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

// login
router.post("/login", async function(req, res, next) {
    const id = req.body.id;
    const password = req.body.password;
    console.log(id, password);
    //res.header("Access-Control-Allow-Origin", "*");
    const result = await admin.findOne({
        where: {id: id}
    });

    const dbpassword = result.dataValues.password;

    if(dbpassword === password) {
        console.log("비밀번호 일치");
        res.send("로그인 확인");
        // 로그인 체크
    }
    else {
        console.log("비밀번호 불일치");
    }
});

module.exports = router;