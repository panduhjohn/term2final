import React, { Component } from 'react'
import './TodoList.css'
import Todo from './Todo/Todo'

export default class TodoList extends Component {
    state = {
        newTodo: ''
    }

    handleNewTodoSubmit = () => {
        console.log('New Todo Submit')
    }

    handleOnChange = (event) => {
        this.setState({
            newTodo: event.target.value
        })
    }

    render() {
        return (
            <>
            <form
                onSubmit={ this.handleNewTodoSubmit }
            >
                <input 
                    name='newTodo'
                    value={ this.state.newTodo }
                    onChange={ this.handleOnChange }
                />
                <button>Submit</button>
            </form>
            <ul>
                <Todo />
            </ul>
            </>
        )
    }
}