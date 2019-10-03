const express = require('express') 
const path = require('path')
// https://www.npmjs.com/package/morgan
const logger = require('morgan')
// https://www.npmjs.com/package/express-session
const session = require('express-session')
const cookieParse = require('cookie-parser')
// https://www.npmjs.com/package/express-validator
const expressValidator = require('express-validator')

let app = express()

// connected views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// connected static folder
app.use(express.static(path.join(__dirname, 'public')))
// enable req.body using html form
app.use(express.urlencoded({ extended: false }))

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
        next()

        return
    }
    
    res.send('Hello folks!')
})

app.get('/', (req, res, next) => {
    console.log(req.query);
    
    res.send(req.query)
})

app.post('/', (req, res) => {
    res.send(req.body)
})

app.get('/users/register', (req, res) => {
    res.render('register', { error_msg : false })
})

app.post('/users/register', (req, res) => {
    req.checkBody('username', 'Between 3 and 15 characters').isLength({ min: 3, max: 15 })
    req.checkBody('username', 'Only use A-Z').notEmpty().blacklist(/<>\//);
    req.checkBody('email', 'Enter a valid email address').isEmail()
    req.checkBody('password2', 'Password is not matching').notEmpty().equals(req.body.password)

    let errors = req.validationErrors()

    if (errors) {
        res.render('register', { error_msg: true, errors: errors })
    } else {
        user.email    = req.body.email
        user.username = req.body.username
        user.password = req.body.password

        req.session.user = user

        res.redirect('/show-me-my-page')
    }
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

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})