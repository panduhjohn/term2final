const express = require('express')
const router = express.Router()
const passport = require('passport')

const todoController = require('./controllers/todoController')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    todoController.getAllTodos(req.query.id)
        .then(todos  => res.json(todos))
        .catch(error => res.json(error))
})

router.post('/createtodo', passport.authenticate('jwt', { session: false }), (req, res) => {
    todoController.createTodo(req.body)
        .then(todo   => res.json(todo))
        .catch(error => res.json(error))
})

router.put('/updatetodobyid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id      = req.body.id
    const newTodo = req.body.newTodo

    todoController.updateTodoByID(id, newTodo)
        .then(updated => res.json(updated))
        .catch(error  => res.json(error))
})

router.delete('/deletetodobyid/:userid/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    const userID = req.params.userid

    todoController.deleteTodoByID(userID, id)
        .then(filteredTodos => res.json(filteredTodos))
        .catch(error => res.json(error))
})

module.exports = router