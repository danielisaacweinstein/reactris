"use strict"

import React from 'react'
import { FallenBlocks } from './FallenBlocks.jsx'
import { FallingBlocks } from './FallingBlocks.jsx'

export class PlayingField extends React.Component {
  render() {

    let {widthRatio, heightRatio, blockSize} = this.props.gameSpec.toJS();

    return (
      <g>
        <rect
          x="0"
          y="0"
          width={widthRatio * blockSize}
          height={heightRatio * blockSize}
          fill="#e6edf0"
        />
        <FallingBlocks
          gameSpec={this.props.gameSpec}
          fallingPieces={this.props.fallingPieces}
        />
        <FallenBlocks
          gameSpec={this.props.gameSpec}
          fallenPieces={this.props.fallenPieces}
        />
      </g>
    );
  }
}
