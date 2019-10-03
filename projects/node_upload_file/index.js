// 1
// const http = require('http')

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
//     res.write('<input type="file" name="fileToUpload"><br>')
//     res.write('<input type="submit">')
//     res.write('</form>')

//     return res.end()
// }).listen(8000)

// 2
// const http = require('http')
// const formidable = require('formidable')

// http.createServer((req, res) => {
//     if (req.url === '/fileupload') {
//         let form = new formidable.IncomingForm()

//         form.parse(req, (err, fields, files) => {
//             res.write('File uploaded :)')
//             res.end()
//         })
//     } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' })
//         res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
//         res.write('<input type="file" name="fileToUpload"><br>')
//         res.write('<input type="submit">')
//         res.write('</form>')

//         res.end()
//     }
// }).listen(8000)


// 3
const http = require('http')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

http.createServer((req, res) => {
    if (req.url === '/fileupload') {
        let form = new formidable.IncomingForm()

        form.parse(req, (err, fields, files) => {
            let oldPath = files.fileToUpload.path

            console.log(`oldPath: `, oldPath);
            
            let newPath = path.join(__dirname, `/uploaded/${ files.fileToUpload.name }`)
            
            console.log(`newPath: `, newPath);
            
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err

                res.write('File uploaded and moved!')
                res.end()
            })
        })
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
        res.write('<input type="file" name="fileToUpload"><br>')
        res.write('<input type="submit">')
        res.write('</form>')

        res.end()
    }
}).listen(8000)