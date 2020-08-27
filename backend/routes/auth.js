const passport = require("passport");
const passportJWT = require("passport-jwt");
const admin = require("../models").admin;
const cfg = require("../config/jwt_config");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtSecret,
  // 클라이언트에서 서버로 토큰을 전달하는 방식  (header, querystring, body 등이 있다.)
  // header 의 경우 다음과 같이 써야 한다 { key: 'Authorization', value: 'JWT' + 토큰
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = function () {
  const strategy = new Strategy(params, function (payload, done) {
    var query = admin.findOne({
      where : {id : payload.id}
    });
    if (query) {
      return done(null, {
        id: query.dataValues.id
      });
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", cfg.jwtSession);
    },
  };
};