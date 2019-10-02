const fs   = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const crud = {}

crud.baseDir = path.join(__dirname, 'database')


/**
 * CREATE
 */
crud.create = (file, data) => {
    // try to open file for writing and fail if such file name exists
    fs.open(`${ crud.baseDir }/${file}.json`, 'wx', (error, identifier) => {
        // if no error and we got an identifier
        if (!error && identifier) {
            let jsonArray = []
            jsonArray.push(data)
            
            // stringify jsonArray with a line break and some spaces
            let stringData = JSON.stringify(jsonArray, null, 3)
            
            // try to write strigified array to the file using idetifier
            fs.writeFile(identifier, stringData, (err) => {
                // if no error try to close 
                if (!err) {
                    fs.close(identifier, (err) => {
                        if (err) console.log(err)
                        else     console.log('No errors')
                    })
                } else {
                    console.log(err)
                }
            })
        }
    })
}

/**
 * r   === open file for reading. An exception occurs if the file does not exist.
 * r+  === open file for reading and writing. An exception occurs if the file does not exist.
 * rs  === open file for reading in synchronous mode.
 * rs+ === open file for reading and writing, telling the OS to open it synchronously.
 * w   === open for writing. The file is created (if it does not exist) or truncated (if it is exist).
 * wx  === Like 'w' but fails if path exists.
 * w+  === open file for reading and writing. The file is created (if it does not exist) or truncated (if it is exist).
 * wx+ === Like 'w+' but fails if path exists.
 * a   === Open file for appending. The file is created if it does not exist.
 * ax  === Like 'a' but fails if path exists.
 * a+  === Open file for reading and appending. The file is created if it does not exist.
 * ax+ === Like 'a+' but fails if path exists.
 */

// crud.create('cars', {'name': 'Ford', 'price': '$3000'})


/**
 * READ
 */
crud.read = (file) => {
    // try to read file 
    fs.readFile(`${ crud.baseDir }/${ file }.json`, 'utf8', (error, data) => {
        // if error send it to console
        if (error) throw error

        console.log(data)
    })
}

// crud.read('cars')

crud.update = (file, data) => {
    let filePath = `${ crud.baseDir }/${ file }.json`
    
    // readFile returns a Promise
    readFile(filePath, 'utf8')
        .then(newStream => {
            // change string to JS object
            let newData = JSON.parse(newStream)

            // push our updates to array
            newData.push(data)

            return JSON.stringify(newData, null, 3)
        })
        .then(finalData => {
            // replace the content in the file with updated data
            fs.truncate(filePath, (error) => {
                if (!error) {
                    fs.writeFile(filePath, finalData, (err) => {
                        if (err) return err
                    })
                } else {
                    return error;
                }
            })
        })
        .catch(error => console.log(error) )
}

// crud.create('cars-updated', { name: 'Mercedes', price: '$400' })
crud.update('cars-updated', { name: 'BMW',   price: '$6000' })

setTimeout(() => {
    crud.read('cars-updated')
    
}, 100);

// crud.update('cars', { name: 'Tesla', price: '$20000' })


/**
 * DELETE
 */

crud.delete = (file) => {
    fs.unlink(`${ crud.baseDir }/${ file }.json`, (err) => {
        if (err) return err
        else     console.log('Deleted!')
    })
}

// crud.delete('cars')