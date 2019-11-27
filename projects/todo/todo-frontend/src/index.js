import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav'
import TodoList from './components/TodoList/TodoList'
import { apiHandleAddNewTodoList } from './api/api'

class App extends Component {
    state = {
        isAuth: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isAuth === false && this.state.isAuth === true) {
            // TODO: get all todos
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
            })
            .catch(err => {
                console.log('err: ', err)
            })
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
                            <li>
                                <a href='/'>All todos</a>
                            </li>
                            <li>
                                <a href='/'>Current todos</a>
                            </li>
                            <li>
                                <a href='/'>Done todos</a>
                            </li>
                        </ul>
                    </div>
                    <TodoList 
                        appHandleAddNewTodoList={ this.appHandleAddNewTodoList }
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