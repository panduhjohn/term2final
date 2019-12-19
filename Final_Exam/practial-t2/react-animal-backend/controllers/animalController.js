const animal = require('../models/Animal')

exports.test = function(req, res) {
    res.send('Greetings from the Test controller!')
}


module.exports = {
    findAllAnimals: () => {

       return new Promise((resolve, reject) => {
            Animal.find(params)
            .then(animals => {
                resolve(animals);
            })
            .catch(err => {
                reject(err);
            }) 
       });
    },
    createAnimal: (params, animal) => {
        return new Promise((resolve, reject) => {

            Animal.create(animal)
                .then(animal => {
                    resolve(animal);
                })
        });
    },

    animalCreate: (req, res) => {
    let animal = new Animal({
        name: req.body.name,
        type: req.body.type
    })

    animal.save(function(err) {
        if (err) {
            return next(err)
        }
        res.send('Animal Created successfully')
    })
    }

    
}
