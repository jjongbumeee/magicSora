var express = require("express");
var router = express.Router();
var jwt = require("jwt-simple");
var auth = require("./auth")();
var admin = require("../models").admin;
var cfg = require("../config/jwt_config");

router.post('/login', (req, res) => {
    if(req.body.id && req.body.password) {
        const id = req.body.id;
        const password = req.body.password;

        const query = admin.findOne({
            where : {id : id}
        });
        const check = (query.id === id && password === query.password);
        if (check) {
            const payload = {
                id: query.id,
                password: query.password
            };
            const token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                token: token
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(401);
    }
});

router.get('/adminCheck', auth.authenticate(), (req, res) => {
    res.send(req.query);
});

module.exports = router;