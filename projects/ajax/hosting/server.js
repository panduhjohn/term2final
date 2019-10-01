// 1. connect modules 'http', 'url', 'fs', 'path'
const http = require('http')
const url  = require('url')
const fs   = require('fs')
const path = require('path')

// 2. get port number from terminal or use default
const port = process.argv[2] || 8000

// 3. create mime tipe map
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

// 4. create server using http object
http.createServer(function (req, res) {
    // 4.1. send request method and requested url to the console
    console.log(`${req.method} ${req.url}`);
    
    // 4.2 parse requested url
    const parsedURL = url.parse(req.url)

    // 4.3 avoid directory traversal attack
    const sanitizedPath = path.normalize(parsedURL.pathname)
    
    // 4.4 attach full path to the directory to the url
    let pathname = path.join(__dirname, sanitizedPath)
    
    // 4.5 check if such pathname exists
    fs.exists(pathname, function (exist) {
        // if path does not exist
        if (!exist) {
            // 4.5.1 send status code file not found
            res.statusCode = 404
            res.end(`File ${pathname} not found!`)

            return
        }
            
        // 4.5.2 check if pathname is a directory 
        if (fs.statSync(pathname).isDirectory()) pathname += 'index.html'
            
        // 4.5.3 try to read pathname
        fs.readFile(pathname, function (err, data) {
            // 4.5.3.1 check if we got an error
            if (err) {
                res.statusCode = 500
                res.end('Error getting the file')

                console.log(`Error getting the file: ${err}`);
            } else {
                // 4.5.3.2 get file extansion
                const ext = path.parse(pathname).ext

                // 4.5.3.3 set correct header
                res.setHeader('Content-type', mimeType[ext] || 'text/plain')

                // 4.5.3.4 send the content of the file
                res.end(data)
            }
        })
    })
}).listen(port) // listen to the port number

console.log(`Server listening on port ${port}`);
