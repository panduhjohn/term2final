const Todo = require('../models/Todo')
const User = require('../../users/models/User')

module.exports = {
    createTodo: (params) => {
        return new Promise((resolve, reject) => {
            User.findById(params.id)
                .then(user => {
                    const newTodo = new Todo({
                        todo: params.todo.newTodo,
                        user_id: user._id
                    })

                    newTodo.save()
                        .then(savedTodo => {
                            user.todos.push(savedTodo)

                            user.save()
                                .then(() => resolve(savedTodo))
                                .catch(error => reject(error))
                        })
                        .catch(error => reject(error))
                })
                .catch(error => reject(error))
        })
    },
    getAllTodos: (id) => {
        return new Promise((resolve, reject) => {
            User.findById(id, 'todos email')
                .populate('todos', '-user_id -__v')
                .exec((err, user) => {
                    if (err) reject(err)
                    else     resolve(user)
                })
        })
    }
}