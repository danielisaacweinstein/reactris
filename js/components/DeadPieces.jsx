"use strict"

import React from 'react'

export class DeadPieces extends React.Component {

  getBlocks(pieces) {
    let { blockSize } = this.props.gameSpec.toJS();
    let coordinatePairs = pieces.toJS();

    let rects = coordinatePairs.map((c, index) => {
      return (
        <rect
          x={c.x}
          y={c.y}
          width={blockSize}
          height={blockSize}
          fill={c.color}
          key={index}
        />
      )
    });

    return rects;
  }

  render() {
    return (
      <g>
        {this.getBlocks(this.props.deadPieces)}
      </g>
    )
  }
}
