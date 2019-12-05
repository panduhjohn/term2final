import { Axios } from './Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './setAuthJWT'

export const apiAuth = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken')

            setAuthJWT(null)

            reject(null)
        } else {
            setAuthJWT(token)

            const user = {
                id:    decoded.id,
                email: decoded.email
            }

            resolve(user)
        }
    })
}

export const apiHandleSignUpAndLogIn = (userInfo) => {
    return new Promise((resolve, reject) => {
        Axios.post('/users/signupandlogin', userInfo, axiosConfig)
            .then(result => { 
                const { token } = result.data

                localStorage.setItem('jwtToken', token)

                const decoded = jwt_decode(token)

                setAuthJWT(token)

                resolve(decoded)
            })
            .catch(error => reject(error.response.data.message))
    })
}

export const apiHandleAddNewTodoList = (newTask) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)

        const newObj = {
            todo: newTask,
            id: decoded.id
        }

        Axios.post('/todo/createtodo', newObj, axiosConfig)
            .then(newTodo => resolve(newTodo.data))
            .catch(err => reject(err))
    })
}

export const apiHandleGetAllTodos = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)

        Axios.get(`/todo?id=${ decoded.id }`)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

export const apiHandleNewEditTodoByID = (id, newTodo) => {
    return new Promise((resolve, reject) => {
        const newObj = {
            id,
            newTodo 
        }

        Axios.put('/todo/updatetodobyid', newObj)
            .then(result => resolve(result.data))
            .catch(error => reject(error))
    })
}

export const apiHandleDeleteByID = (todoID) => {
    return new Promise((resolve, reject) => {
        const token   = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)

        Axios.delete(`/todo/deletetodobyid/${ decoded.id }/${ todoID }`)
            .then(result => resolve(result.data.todos))
            .catch(error => reject(error))
    })
}

export const apiHandleCompletedByID = (id, bool) => {
    return new Promise((resolve, reject) => {
        Axios.put(`/todo/completetodobyid/${ id }`, { completed: bool })
            .then(completedTodo => resolve(completedTodo.data))
            .catch(error => reject(error))
    })
}

export const apiHandleGetTodosByCompletion = (completion) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)

        Axios.get(`/todo/findtodobycategory?completed=${ completion }&userid=${ decoded.id }`)
            .then(completionTodos => resolve(completionTodos.data))
            .catch(error => reject(error))
    })
}

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}