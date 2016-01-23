"use strict"

import React from 'react'
import { LivePiece } from './LivePiece.jsx'
import { DeadPieces } from './DeadPieces.jsx'

export class PlayingField extends React.Component {
  render() {

    let { widthRatio, heightRatio, blockSize } = this.props.gameSpec.toJS();

    return (
      <g>
        <rect
          x={this.props.xOffset}
          y={this.props.yOffset}
          width={widthRatio * blockSize}
          height={heightRatio * blockSize}
          fill="#e6edf0"
        />
        <LivePiece
          gameSpec={this.props.gameSpec}
          livePiece={this.props.livePiece}
        />
        <DeadPieces
          gameSpec={this.props.gameSpec}
          deadPieces={this.props.deadPieces}
        />
      </g>
    );
  }
}
