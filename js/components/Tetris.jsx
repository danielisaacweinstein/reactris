"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import { moveHorizontal,
         moveLeft,
         moveRight,
         descend,
         rotate,
         incrementTime } from '../actions.js'

export class Tetris extends React.Component {
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

    var descendInterval = window.setInterval(() => {
      this.props.dispatch(descend())
    }, 750);

    var secondInterval = window.setInterval(() => {
      this.props.dispatch(incrementTime());
      console.log(this.props.secondsElapsed);
    }, 1000);

  }

  render() {
    return (
      <div className="gameContainer">
        <Game
          livePiece={this.props.livePiece}
          queuedPiece={this.props.queuedPiece}
          deadPieces={this.props.deadPieces}
          gameSpec={this.props.gameSpec}
          secondsElapsed={this.props.secondsElapsed}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.toJS());
  return {
    livePiece: state.get('livePiece'),
    queuedPiece: state.get('queuedPiece'),
    deadPieces: state.get('deadPieces'),
    gameSpec: state.get('gameSpec'),
    isPaused: state.get('isPaused'),
    secondsElapsed: state.get('secondsElapsed')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);
