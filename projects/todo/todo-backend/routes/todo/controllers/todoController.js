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
    },
    updateTodoByID: (id, newTodo) => {
        return new Promise((resolve, reject) => {
            Todo.findByIdAndUpdate(id, { todo: newTodo }, { new: true })
                .then(newTodo => resolve(newTodo))
                .catch(error  => reject(error))
        })
    },
    deleteTodoByID: (userID, id) => {
        return new Promise((resolve, reject) => {
            User.findById(userID)
                .then(user => {
                    const filteredArray = user.todos.filter(t => t.toString() !== id)

                    user.todos = filteredArray

                    user.save()
                        .then(user => {
                            Todo.findByIdAndDelete(id)
                                .then(deleted => {
                                    User.findById(userID, 'todos')
                                        .populate('todos', '-user-id -__v')
                                        .exec((error, user) => {
                                            if (error) reject(error)
                                            else resolve(user)
                                        })
                                })
                                .catch(error => reject(error))
                        })
                        .catch(error => reject(error))
                })
                .catch(error => reject(error))
        })
    }
}