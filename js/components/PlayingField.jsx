"use strict"

import React from 'react'
import { CurrentPiece } from './CurrentPiece.jsx'
import { FallenBlocks } from './FallenBlocks.jsx'

export class PlayingField extends React.Component {
  render() {
    let rectWidth = this.props.gameSpec.width *
                    this.props.gameSpec.blockSize;
    let rectHeight = this.props.gameSpec.height * 
                     this.props.gameSpec.blockSize;

    return (
      <g>
        <rect
          x={this.props.x}
          y={this.props.y}
          width={rectWidth}
          height={rectHeight}
          fill="#E6E6FA"
        />
        <CurrentPiece

        />
        <FallenBlocks />
      </g>
    );
  }
}
