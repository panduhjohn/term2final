const express = require('express');
const passport = require('passport')
const router  = express.Router();

const userController   = require('./controllers/userController')
const signupValidation = require('./utils/signupValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/')

    res.render('auth/signup', { error_msg: null })
})

router.post('/signup', signupValidation, userController.signup)

router.get('/signin', (req, res) => {
    if (req.isAuthenticated()) res.redirect('/')

    res.render('auth/signin')
})

router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/users/signin',
    failureFlash:    true
}))

router.get('/edit-profile', (req, res) => {
    res.render('account/profile')
})

router.get('/logout', (req, res) => {
    req.logOut()

    res.redirect('/')
})

module.exports = router;