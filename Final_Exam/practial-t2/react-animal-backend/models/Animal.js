const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    type: {type: String, default: ''}
});

module.exports = mongoose.model('animal', AnimalSchema);