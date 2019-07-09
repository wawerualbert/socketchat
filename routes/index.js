var express = require('express');
var router = express.Router();
var ensureAuthentiacted =  require('../config/auth');
router.get('/', function(req, res){
    res.render('welcome');
});

//dashboard
router.get('/dashboard', ensureAuthentiacted, (req, res));{
    res.render('dashboard', {
        name:req.user.name
    });
}

module.exports = router;