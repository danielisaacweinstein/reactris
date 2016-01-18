"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Game } from './Game.jsx'
import {  } from '../actions.js'

export class Tetris extends React.Component {
  render() {
    let gameSpecs = {
      width: this.props.dimensions.get('x'),
      height: this.props.dimensions.get('y'),
      blockSize: this.props.blockSize
    }

    return (
      <div>
        <Game
          gameSpecs={gameSpecs}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dimensions: state.get('dimensions'),
    blockSize: state.get('blockSize')
  }
}

export const TetrisContainer = connect(mapStateToProps)(Tetris);