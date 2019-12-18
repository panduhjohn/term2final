

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
    }
}