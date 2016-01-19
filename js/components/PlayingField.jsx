"use strict"

import React from 'react'
import { CurrentPiece } from './CurrentPiece.jsx'
import { FallenBlocks } from './FallenBlocks.jsx'

export class PlayingField extends React.Component {
  render() {

    let {fieldWidth, fieldHeight, blockSize} = this.props.gameSpec.toJS();

    return (
      <g>
        <rect
          x="0"
          y="0"
          width={fieldWidth * blockSize}
          height={fieldHeight * blockSize}
          fill="#e6edf0"
        />
        <CurrentPiece
          gameSpec={this.props.gameSpec}
          fallingPieces={this.props.fallingPieces}
        />
        <FallenBlocks />
      </g>
    );
  }
}
