"use strict"

import React from 'react'
import { Blocks } from './Blocks.jsx'

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
        <Blocks
          gameSpec={this.props.gameSpec}
          fallingPieces={this.props.fallingPieces}
          fallenPieces={this.props.fallenPieces}
        />
      </g>
    );
  }
}
