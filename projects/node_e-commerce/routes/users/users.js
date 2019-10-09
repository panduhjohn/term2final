const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup', { errors: [] })
})

router.post('/signup', (req, res) => {
    userController.signup(req.body)
                    .then(user => {
                        res.redirect('/')
                    })
                    .catch(error => {
                        console.log(`error: `, error);
                        
                        res.render('auth/signup', { errors: error })
                    })
})

module.exports = router;
