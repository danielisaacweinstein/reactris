"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import { moveHorizontal,
         moveLeft,
         moveRight,
         descend,
         rotate,
         incrementTime,
         play,
         pause,
         setInitialState } from '../actions.js'

export class Tetris extends React.Component {
  resetGame() {
    this.pauseTimers();
    this.props.dispatch(setInitialState());
  }

  playTimers() {
    window.descendInterval = window.setInterval(() => {
      this.props.dispatch(descend());
    }, 750);

    window.timerInterval = window.setInterval(() => {
      this.props.dispatch(incrementTime());
    }, 1000);

    this.props.dispatch(play());
  }

  pauseTimers() {
    window.clearInterval(window.descendInterval);
    window.clearInterval(window.timerInterval);

    this.props.dispatch(pause());
  }

  componentWillMount() {
    document.onkeydown = ((e) => {
      if (e.keyCode === 40) { // Down arrow
        this.props.dispatch(descend());
      }
      if (e.keyCode === 37) { // Left arrow
        this.props.dispatch(moveHorizontal(-1));
      }
      if (e.keyCode === 39) { // Right arrow
        this.props.dispatch(moveHorizontal(1));
      }
      if (e.keyCode === 38) { // Up arrow
        this.props.dispatch(rotate());
      }
    });
  }

  render() {
    return (
      <div className="gameContainer">
        <h1 className="title">
          REACTRIS
        </h1>
        <Game
          livePiece={this.props.livePiece}
          queuedPiece={this.props.queuedPiece}
          deadPieces={this.props.deadPieces}
          gameSpec={this.props.gameSpec}
          secondsElapsed={this.props.secondsElapsed}
          isPaused={this.props.isPaused}
          playTimers={this.playTimers.bind(this)}
          pauseTimers={this.pauseTimers.bind(this)}
          resetGame={this.resetGame.bind(this)}
          gameLost={this.props.gameLost}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    livePiece: state.get('livePiece'),
    queuedPiece: state.get('queuedPiece'),
    deadPieces: state.get('deadPieces'),
    gameSpec: state.get('gameSpec'),
    isPaused: state.get('isPaused'),
    secondsElapsed: state.get('secondsElapsed'),
    gameLost: state.get('gameLost')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);
