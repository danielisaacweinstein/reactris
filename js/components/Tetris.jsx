"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import { moveLeft, moveRight, descend } from '../actions.js'
// import { fallingPieceColliding } from '../helpers.js'

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
    }
  }

  render() {
    return (
      <div>
        <Game
          fallingPieces={this.props.fallingPieces}
          fallenPieces={this.props.fallenPieces}
          gameSpec={this.props.gameSpec}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fallingPieces: state.get('fallingPieces'),
    fallenPieces: state.get('fallenPieces'),
    gameSpec: state.get('gameSpec')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);
