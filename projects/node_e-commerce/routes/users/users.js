const express = require('express');
const router  = express.Router();

const userController   = require('./controllers/userController')
const signupValidation = require('./utils/signupValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
    console.log('req.isAuthenticated(): ', req.isAuthenticated())
    console.log('req.user: ', req.user)

    if (req.isAuthenticated()) return res.redirect('/')

    res.render('auth/signup', { errors: req.flash('errors'), error_msg: null })
})

router.post('/signup', signupValidation, userController.signup)

router.get('/signin', (req, res) => {
    req.flash('testError', 'some error')

    res.render('auth/signin', { errors: [] })
})

router.post('/signin', (req, res) => {
    console.log('data comming from flash: ', req.flash('testError'))
    console.log('data comming from flash: ', req.flash('testError'))

    userController.signin(req.body)
                    .then(user => {
                        res.redirect('/')
                    })
                    .catch(err => {
                        res.render('auth/signin', { errors: [err] })
                    })
})

module.exports = router;
