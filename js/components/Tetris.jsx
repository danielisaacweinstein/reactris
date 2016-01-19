"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import { descend, moveLeft } from '../actions.js'

export class Tetris extends React.Component {
  componentWillMount() {
    this.gameSpecs = {
      fieldWidth: 10,
      fieldHeight: 20,
      blockSize: 20      
    }

    document.onkeydown = (e) => {
      if (e.keyCode === 40) {
        this.props.dispatch(descend());
      }
      if (e.keyCode === 37) {
        this.props.dispatch(moveLeft());
      }
    }
  }

  render() {
    return (
      <div>
        <Game
          currentPiece={this.props.currentPiece}
          gameSpecs={this.gameSpecs}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPiece: state.get('currentPiece')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);