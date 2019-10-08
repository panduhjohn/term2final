const express = require('express') 
const path = require('path')
// https://www.npmjs.com/package/morgan
const logger = require('morgan')
// https://www.npmjs.com/package/express-session
const session = require('express-session')
const cookieParse = require('cookie-parser')
// https://www.npmjs.com/package/express-validator
const expressValidator = require('express-validator')
const authChecker = require('./utils/authChecker')
const isLoggedIn  = require('./utils/isLoggedIn') 

let app = express()

// connected views folder
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// connected static folder
app.use(express.static(path.join(__dirname, 'public')))
// enable req.body using html form
app.use(express.urlencoded({ extended: true }))

app.use(logger('dev'))

// let our app work with json
app.use(express.json())
app.use(cookieParse('super-secret'))

let user = {}

app.use(session({
    secret: 'super-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
    }
}))

app.use(expressValidator({
    errorFormatter: (param, message, value) => {
        let namespace = param.split('.')
        let root      = namespace.shift()
        let formParam = root

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }

        return {
            param: formParam,
            message: message,
            value: value
        }
    }
}))

app.get('/', (req, res, next) => {
    console.log(req.session)
    console.log(req.session.cookie)

    if (Object.keys(req.query).length != 0) {
        // pass to next route
        next()

        return
    }
    
    res.send('Hello folks!')
})

app.get('/', (req, res, next) => {
    console.log(req.query);
    
    res.send(req.query)
})

app.get('/users/register', isLoggedIn, (req, res) => {
    console.log(`81: `);
    
    res.render('register', { error_msg : false })
})

app.post('/users/register', authChecker ,(req, res) => {
    let errors = req.validationErrors()

    console.log(errors)
    
    if (errors) {
        res.render('register', { error_msg: true, errors: errors })
    } else {
        user.email    = req.body.email
        user.username = req.body.username
        user.password = req.body.password

        req.session.user = user

        console.log(`req.session.user: `, req.session.user);
        
        res.redirect('/show-me-my-page')
    }
})

// route for users/login
app.get('/users/login', isLoggedIn , (req, res) => {
    res.render('login', { success_msg: false, error_msg: false })
})

// write route to handle request from login form
app.post('/users/login', (req, res) => {
    req.checkBody('password').equals(user.password).withMessage('Password does not match')

    let errors = req.validationErrors()

    if (errors) {
        res.render('login', { error_msg: true, errors: errors, success_msg: false })
    } else {
        req.session.user = req.body.email
        
        res.render('login', { error_msg: false, success_msg: 'Success! You are logged in!'})
    }
})

app.get('/users/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/show-me-my-page')
})

app.get('/show-me-my-page', (req, res) => {
    if (req.session.user) {
        res.render('index', { user: req.session.user })
    } else {
        res.render('index', { user: null })
    }
})

app.get('/test', (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.send('got req to *')
})

app.listen(3001, () => {
    console.log('Server is running on port 3000')
})