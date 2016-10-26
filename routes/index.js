var express = require('express');
var router = express.Router();

router.get('/demo', function(req, res) {
  res.render('demo.html');
});

module.exports = router;