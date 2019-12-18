const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    type: {type: String, default: ''},
});

module.exports = mongoose.model('animal', AnimalSchema);