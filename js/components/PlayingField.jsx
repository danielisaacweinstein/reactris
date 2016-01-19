"use strict"

import React from 'react'
import { CurrentPiece } from './CurrentPiece.jsx'
import { FallenBlocks } from './FallenBlocks.jsx'

export class PlayingField extends React.Component {
  render() {
    let gameSpecs = this.props.gameSpecs;

    let rectWidth = gameSpecs.fieldWidth * gameSpecs.blockSize;
    let rectHeight = gameSpecs.fieldHeight * gameSpecs.blockSize;

    return (
      <g>
        <rect
          x="0"
          y="0"
          width={rectWidth}
          height={rectHeight}
          fill="#E6E6FA"
        />
        <CurrentPiece
          gameSpecs={gameSpecs}
          currentPiece={this.props.currentPiece}
        />
        <FallenBlocks />
      </g>
    );
  }
}
