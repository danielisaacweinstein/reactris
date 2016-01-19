"use strict"

import React from 'react'
import { CurrentPiece } from './CurrentPiece.jsx'
import { FallenBlocks } from './FallenBlocks.jsx'

export class PlayingField extends React.Component {
  render() {

    let {fieldWidth, fieldHeight, blockSize} = this.props.gameSpecs;

    return (
      <g>
        <rect
          x="0"
          y="0"
          width={fieldWidth * blockSize}
          height={fieldHeight * blockSize}
          fill="#E6E6FA"
        />
        <CurrentPiece
          gameSpecs={this.props.gameSpecs}
          currentPiece={this.props.currentPiece}
        />
        <FallenBlocks />
      </g>
    );
  }
}
