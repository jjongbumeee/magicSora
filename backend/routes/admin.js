var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var jwt_s = require("jwt-simple");
var admin = require("../models").admin;
var cfg = require("../config/jwt_config");

router.post('/login', (req, res) => {
    if(req.body.id && req.body.password) {
        const id = req.body.id;
        const password = req.body.password;
        admin.findOne({
            where : {id : id}
        })
        .then(adminDb => {
            const idDb = adminDb.dataValues.id;
            const pwdDb = adminDb.dataValues.password;
            const check = (pwdDb === password);
            if (check) {
                const payload = {
                    id: idDb
                };
                const token = jwt_s.encode(payload, cfg.jwtSecret);
                res.json({
                    token: token
                });
            }
            else {
                res.sendStatus(401);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    else {
        res.sendStatus(401);
    }
});

router.get('/adminCheck', (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token;

    if(!token) {
        return res.status(403).json({
            suceess: false,
            message: 'not logged in'
        });
    }
    
    /* 토큰 유효성 검사 */
    const vaild = new Promise((resolve, reject) => {
        jwt.verify(token, cfg.jwtSecret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        })
    });
    /* 유효하지 않은 토큰으로 403 에러 처리 */
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    };

    vaild.then((decoded) => {
        res.json(decoded);
    }).catch(onError);
});

module.exports = router;