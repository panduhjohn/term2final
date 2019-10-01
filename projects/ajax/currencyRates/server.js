const http = require('http')
const url  = require('url')
const fs   = require('fs')
const path = require('path')

const port = process.argv[2] || 8000;

// MIME stands for Multipurpose Internet Mail Extensions
const mimeType = {
    '.ico'  : 'image/z-icon',
    '.html' : 'text/html',
    '.js'   : 'text/javascript',
    '.json' : 'application/json',
    '.css'  : 'text/css',
    '.png'  : 'image/png',
    '.jpg'  : 'image/jpg',
    '.wav'  : 'audio/wav',
    '.mp3'  : 'audio/mp3',
    '.svg'  : 'image/svg+xml',
    '.pdf'  : 'application/pdf',
    '.doc'  : 'application/msword',
    '.eot'  : 'application/vnd.ms-fontobject',
    '.ttf'  : 'application/font-sfnt'
}

http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`)

    const parsedURL = url.parse(req.url)
    
    // Avoid Directory traversal attack
    const sanitizePath = path.normalize(parsedURL.pathname).replace(/^(\.\.[\/\\])+/, '')
    let pathName = path.join(__dirname, sanitizePath)

    fs.exists(pathName, function (exist) {
        if (!exist) {
            res.statusCode = 404
            res.end(`File ${pathName} not found!`)

            return
        }

       if (fs.statSync(pathName).isDirectory()) pathName += '/index.html'

       fs.readFile(pathName, function (err, data) {
            if (err) {
               res.statusCode = 500
               res.end(`Error getting the file`)

               console.log(`Error getting the file: ${err}`);
            } else {
                const ext = path.parse(pathName).ext

                res.setHeader('Content-type', mimeType[ext] || 'text/plain')

                res.end(data)
            }
       })
    })
    
}).listen(parseInt(port))

console.log(`Server is running on port: ${port}`);