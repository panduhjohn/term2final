// * 1. create an event ‘createFile’ which will create file ‘{yourName}.txt’ with current date and time inside
// * 2. create an event ‘readFile’wich in 10 sec will read ‘{yourName}.txt’ and print out content to console
// * 3. create an event ‘updateFile’ wich in 10 sec will update ‘{yourName}.txt’ with string ‘updated’ and print out content to console
// * 4. create an event ‘deleteFile’ wich in 10 sec will delete ‘{yourName}.txt’ and send email to yuri.shkoda@codeimmersives.com with text ‘File {fileName}.txt DELETED!’

const events = require('events')
const eventEmitter = new events.EventEmitter()
const fs = require('fs')
const nodemailer = require('nodemailer')
const path = require('path')
const { promisify } = require('util')
const read   = promisify(fs.readFile)
// const Secret = require('./secret')

// const secret = new Secret()
// const pass   = secret.getPass()

const crud = {}

crud.basePath = path.join(__dirname, '/YuryShkoda.txt')

crud.create = (data) => {
    fs.open(crud.basePath, 'wx', (err, id) => {
        if (!err && id) {
            fs.writeFile(id, data, (err) => {
                if (!err) {
                    fs.close(id, (err) => {
                        if (err) console.log(err)
                        else     console.log('No errors')
                    })
                }
            })
        } else {
            console.log(err);
        }
    })
} 

crud.read = () => {
    fs.readFile(crud.basePath, 'utf8', (err, data) => {
        if (err) throw err

        console.log(data);
    })
}

crud.update = (data) => {
    read(crud.basePath, 'utf8')
        .then(newStream => {
            let newData = newStream + '\n' + data

            return newData
        })
        .then(finalData => {
            fs.truncate(crud.basePath, (err) => {
                if (!err) {
                    fs.writeFile(crud.basePath, finalData, (err) => {
                        if (err) return err
                    })
                } else {
                    return err
                }
            })
        })
}

crud.delete = () => {
    fs.unlink(crud.basePath, (err) => {
        if (!err) console.log('Deleted!')
        else return err
    })
}

let createFile = () => {
    crud.create(new Date().toLocaleString())
    
    setTimeout(() => {
        eventEmitter.emit('readFile')
    }, 3000);
}

let readFile = () => {
    crud.read()

    setTimeout(() => {
        eventEmitter.emit('updateFile')
    }, 3000);
}

let updateFile = () => {
    crud.update('Updated!')
    
    setTimeout(() => {
        eventEmitter.emit('deleteFile')
    }, 3000);
}

let deleteFile = () => {
    crud.delete()

    // sendEmail()
}

let sendEmail = () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yuri.shkoda@codeimmersives.com',
            pass: pass
        }
    })

    let mailOpt = {
        from: 'yuri.shkoda@codeimmersives.com',
        to: 'yuri.shkoda@codeimmersives.com',
        subject: 'events+fs+emai',
        text: `File YuryShkoda.txt DELETED!`
    }

    transporter.sendMail(mailOpt, (err, i) => {
        if (err) console.log(err)
        else     console.log(i)
    })
}


eventEmitter.on('createFile', createFile)
eventEmitter.on('readFile',   readFile)
eventEmitter.on('updateFile', updateFile)
eventEmitter.on('deleteFile', deleteFile)

eventEmitter.emit('createFile')