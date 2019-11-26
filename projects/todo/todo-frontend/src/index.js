import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav'
import TodoList from './components/TodoList/TodoList'

class App extends Component {
    state = {
        isAuth: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isAuth === false && this.state.isAuth === true) {
            
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
                    <TodoList />
                    </>
                ) : (
                    <h1>You need to Login to use this App</h1>
                ) }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));