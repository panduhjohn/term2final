import React, { Component } from 'react'
import './TodoList.css'
import Todo from './Todo/Todo'

export default class TodoList extends Component {
    state = {
        newTodo: ''
    }

    handleNewTodoSubmit = (event) => {
        event.preventDefault()

        this.props.appHandleAddNewTodoList(this.state)

        this.setState({
            newTodo: ''
        })
    }

    handleOnChange = (event) => {
        this.setState({
            newTodo: event.target.value
        })
    }

    showTodoList() {
        console.log(`this.props.todoList: `, this.props.todoList);

        return this.props.todoList.map((item) => {
            return (
                <Todo
                    key={ item._id } 
                    id={ item._id }
                    item={ item.todo }
                    completed={ item.completed }
                    todoHandleNewEditTodoByID={ this.props.appHandleNewEditTodoByID }
                />
            )
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
            <ul style={ styles.listStyle }>
                {
                    this.props.todoList ? this.showTodoList() : null
                }
            </ul>
            </>
        )
    }
}

const styles = {
    listStyle: {
        listStyleType: 'none'
    }
}