var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var admin = require("../models").admin;
var cfg = require("../config/jwt_config");

router.post('/login', async (req, res) => {
    if(req.body.id && req.body.password) {
        const id = req.body.id;
        const password = req.body.password;
        var idDb, pwdDb;
        await admin.findOne({
            where : {id : id}
        })
        .then(adminDb => {
            idDb = adminDb.dataValues.id;
            pwdDb = adminDb.dataValues.password;
        })
        .catch(err => {
            console.error(err);
        });
        const check = (idDb == id) && (pwdDb == password);
        if (check) {
            const payload = {
                id: idDb
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