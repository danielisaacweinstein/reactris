"use strict"

import React from 'react'
import { PlayingField } from './PlayingField.jsx'

export class Game extends React.Component {
  render() {
    let gameSpecs = this.props.gameSpecs;

    // Create SVG with width double that of playing field
    return (
      <svg
        width={gameSpecs.fieldWidth * gameSpecs.blockSize * 2}
        height={gameSpecs.fieldHeight * gameSpecs.blockSize}>
        <PlayingField
          gameSpecs={this.props.gameSpecs}
          currentPiece={this.props.currentPiece}
        />
      </svg>
    );
  }
}