"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import {  } from '../actions.js'

export class Tetris extends React.Component {
  render() {
    // debugger;
    let gameSpecs = {
      fieldWidth: 10,
      fieldHeight: 20,
      blockSize: 20
    }

    return (
      <div>
        <Game
          currentPiece={this.props.currentPiece}
          gameSpecs={gameSpecs}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPiece: state.get('currentPiece')
    // dimensions: state.get('dimensions'),
    // blockSize: state.get('blockSize')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);