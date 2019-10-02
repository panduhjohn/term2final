const Secret = require('./secret')
const secret = new Secret()
const pass   = secret.getPass()

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yuri.shkoda@codeimmersives.com',
        pass: pass
    }
})

let mailOptions = {
    from: 'yuri.shkoda@codeimmersives.com',
    to:   'yuri.shkoda@codeimmersives.com',
    subject: 'Sending email using Node.js',
    text: 'That was easy!' 
}

transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err)
    else     console.log(`Email sent: ${info.response}`)
})