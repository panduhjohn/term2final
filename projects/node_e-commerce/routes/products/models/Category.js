const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { type: String, unique: true, lowercase: true }
})

module.exports = mongoose.model('category', CategorySchema)

// 1. Create route to handle add-category request
// 2. Validate category name (notEmpty)
// 2.1 If category name is an empty string, display error message
// 3. Create new category in DB and display success message