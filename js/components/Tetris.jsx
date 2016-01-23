"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import { moveLeft, moveRight, descend, rotate } from '../actions.js'

export class Tetris extends React.Component {
  componentWillMount() {
    document.onkeydown = (e) => {
      if (e.keyCode === 40) {
        this.props.dispatch(descend());
      }
      if (e.keyCode === 37) {
        this.props.dispatch(moveLeft());
      }
      if (e.keyCode === 39) {
        this.props.dispatch(moveRight());
      }
      if (e.keyCode === 38) {
        this.props.dispatch(rotate());
      }
    }
  }

  render() {
    return (
      <div className="gameContainer">
        <Game
          livePiece={this.props.livePiece}
          deadPieces={this.props.deadPieces}
          gameSpec={this.props.gameSpec}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.toJS());
  return {
    livePiece: state.get('livePiece'),
    deadPieces: state.get('deadPieces'),
    gameSpec: state.get('gameSpec')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);
