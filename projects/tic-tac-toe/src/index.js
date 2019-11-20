import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        squares={ ['X', 'O', 'X', 'X', 'O', 'X', '', '', ''] }
                    />
                </div>
                <div className='game-info'>
                    Game Info
                </div>
            </div>
        )
    }
}

class Board extends Component {
    renderSquare(i) {
        return (
            <Square 
                value={ this.props.squares[i] }
            />
        )
    }

    render() {
        return (
            <div>
                <div className='board-row'>
                    { this.renderSquare(0) }
                    { this.renderSquare(1) }
                    { this.renderSquare(2) }
                </div>
                <div className='board-row'>
                    { this.renderSquare(3) }
                    { this.renderSquare(4) }
                    { this.renderSquare(5) }
                </div>
                <div className='board-row'>
                    { this.renderSquare(6) }
                    { this.renderSquare(7) }
                    { this.renderSquare(8) }
                </div>
            </div>
        )
    }
}

const Square = (props) => {
    return (
        <button className='square'>
            { props.value }
        </button>
    )
}

ReactDOM.render(<Game />, document.getElementById('root'));
