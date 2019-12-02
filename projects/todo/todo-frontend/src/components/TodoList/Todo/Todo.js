import React, { Component } from 'react'

export default class Todo extends Component {
    state = {
        isToggle: false,
        newEditTodo: this.props.item,
        currentTodo: this.props.item
    }
    
    handleEditToggle = () => {
        this.setState((prevState) => {
            return {
                isToggle: !prevState.isToggle,
                newEditTodo: this.state.currentTodo
            }
        })
    }

    handleEditOnChange = (event) => {
        this.setState({
            newEditTodo: event.target.value
        })
    }

    render() {
        const {
            id,
            item,
            todoHandleNewEditTodoByID
        } = this.props

        return (
            <li>
                {
                    this.state.isToggle ? (
                        <>
                            <input 
                                defaultValue={ item }
                                onChange={ this.handleEditOnChange } 
                            />
                            <button
                                onClick={ this.handleEditToggle }
                                className='buttonClass btn btn-danger'
                            >
                                Cancel</button>
                            <button
                                className='buttonClass btn btn-primary'
                                disabled={ this.state.newEditTodo === this.state.currentTodo ? true : false }
                                onClick={ () => {
                                    todoHandleNewEditTodoByID(id, this.state.newEditTodo)

                                    this.handleEditToggle()
                                }}
                            >Submit</button>
                        </>
                    ) : (
                        <>
                            { item }
                            <button 
                                className='buttonClass btn btn-success'
                                onClick={ this.handleEditToggle }
                            >
                                Edit
                            </button>
                        </>
                    )
                }
            </li>
        )
    }
}