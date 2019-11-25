const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')

router.post('/signupandlogin', (req, res) => {
    userController.signupAndLogin(req.body)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(err.status).json(err)
        })
})

module.exports = router