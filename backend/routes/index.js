var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/time', (req, res) => {
  const time = new Date().getMinutes();
  res.send({time: time});
})
module.exports = router;