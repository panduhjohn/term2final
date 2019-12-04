import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav'
import TodoList from './components/TodoList/TodoList'
import { 
        apiHandleAddNewTodoList,
        apiHandleGetAllTodos,
        apiHandleNewEditTodoByID,
        apiHandleDeleteByID,
        apiHandleCompletedByID 
    } from './api/api'

class App extends Component {
    state = {
        todoLibrary: {},
        selected: 'all',
        isAuth: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isAuth === true && prevState.isAuth === false) {
            this.appHandleGetAllTodos()
        } 
    }

    appHandleAuthSubmit = () => {
        this.setState({
            isAuth: true
        })
    }

    appHandleLogout = () => {
        this.setState({
            isAuth: false
        })
    }

    appHandleAddNewTodoList = (newTodoFromTodoList) => {
        apiHandleAddNewTodoList(newTodoFromTodoList)
            .then(createdNewTodo => {
                console.log('createdNewTodo: ', createdNewTodo)

                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        'all': [...todoLibrary.all, createdNewTodo]
                    }
                }), () => {
                    // getAllCompleted
                    // getAllInCompleted
                })
            })
            .catch(err => {
                console.log('err: ', err)
            })
    }

    appHandleGetAllTodos = () => {
        apiHandleGetAllTodos()
            .then(allTodos => {
                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        'all': allTodos.data.todos
                    }
                }))
            })
            .catch(error => console.log('error: ', error))
    }

    appHandleNewEditTodoByID = (id, newTodo) => {
        apiHandleNewEditTodoByID(id, newTodo)
            .then(updatedTodo => {
                const newComplitedList = this.state.todoLibrary.all.map(item => {
                    if(item._id === id) item.todo = updatedTodo.todo

                    return item
                })

                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        'all': newComplitedList
                    }
                }))
            })
            .catch(error => console.log('[index.js] error', error))
    }

    appHandleDeleteByID = (id) => {
        apiHandleDeleteByID(id)
            .then(filteredTodos => {
                this.setState(({ todoLibrary }) => ({
                    todoLibrary:{
                        ...todoLibrary,
                        'all': filteredTodos
                    }
                }))
            })
            .catch(error => console.log(error))
    }

    appHandleCompleteById = (id, bool) => {
        apiHandleCompletedByID(id, bool)
            .then(completedTodo => {
                const newCompletedList = this.state.todoLibrary.all.map(t => {
                    if (t._id === completedTodo._id) {
                        t.completed = completedTodo.completed

                        return t
                    } else {
                        return t
                    }
                })

                this.setState(({ todoLibrary }) => {
                    return {
                        todoLibrary: {
                            ...todoLibrary,
                            'all': newCompletedList
                        }
                    }
                })
            })
            .catch(error => console.log(error))
    }

    appHandleGetTodosByCompletion = (completion) => {
        let completeBool;

        this.setState({
            selected: completion
        })

        if (completion === 'all') return
        else if (completion === 'incomplete') completeBool = false
        else if (completion === 'completed')  completeBool = true

        if (!this.state.todoLibrary[completion] || this.state.todoLibrary[completion].length === 0) {
            // make api call to get todos with completed = completion
        }
    }

    render() {
        return (
            <div className='App'>
                <Nav 
                    appHandleAuthSubmit={ this.appHandleAuthSubmit }
                    appHandleLogout={ this.appHandleLogout }
                />
                { this.state.isAuth ? (
                    <>
                    <div id='category'>
                        <ul>
                            <li onClick={ () => this.appHandleGetTodosByCompletion('all') }>
                                <a href='/'>All todos</a>
                            </li>
                            <li onClick={ () => this.appHandleGetTodosByCompletion('incomplete') }>
                                <a href='/'>Current todos</a>
                            </li>
                            <li onClick={ () => this.appHandleGetTodosByCompletion('completed') }>
                                <a href='/'>Done todos</a>
                            </li>
                        </ul>
                    </div>
                    <TodoList 
                        appHandleAddNewTodoList={ this.appHandleAddNewTodoList }
                        todoList={ this.state.todoLibrary[this.state.selected] }
                        appHandleNewEditTodoByID={ this.appHandleNewEditTodoByID }
                        appHandleDeleteByID={ this.appHandleDeleteByID }
                        appHandleCompleteById={ this.appHandleCompleteById }
                    />
                    </>
                ) : (
                    <h1>You need to Login to use this App</h1>
                ) }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));