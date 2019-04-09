import React from 'react';
import './index.css';
import Board from './Board'
import declareWinner from './helper'

class GameContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            history: [{squares: Array(9).fill(null)}],
            xIsNext:true,
            stepNumber: 0,
        }
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext:(step %2)===0
        });
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length-1]
        const squares = current.squares.slice()

        if(declareWinner(squares) || squares[i]){
            return;
        }
        squares[i]= this.state.xIsNext? 'X' : 'O'
        this.setState({
            history:history.concat([{squares:squares}]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext
        })
    }

    resetGame(){
        this.setState({
            history: [{squares: Array(9).fill(null)}],
            xIsNext:true,
            stepNumber: 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = declareWinner(current.squares)

        const moves = history.map((step,move)=>{
            const desc = move?
                'Go to move#: '+move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if(winner) {
            status = 'Winner is: '+ winner;
        }else{
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');

        }

        return (
            <div className="container">
                <h1> Welcome to Tic Tac Toe Game!</h1>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i)=>this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div className="status" >{status}</div>
                        <ol>{moves}</ol>
                        <button className="reset-game" onClick={()=>this.resetGame()}>Reset Game</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default GameContainer;
