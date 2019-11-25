const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:    { type: String, default: '' },
    password: { type: String, default: '' },
    todos: [{ type: Schema.Types.ObjectId, ref: 'todo' }]
})

module.exports = mongoose.model('user', UserSchema)