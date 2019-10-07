const express = require('express');
const router = express.Router();

let User = require('../models/User')

/* GET users listing. */
// TODO
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', (req, res) => {
    
})

router.get('/register', (req, res) => {
    res.render('register', { error_msg: false, success_msg: false })
})

module.exports = router;
