"use strict"

import React from 'react'

export class QueuedPiece extends React.Component {

  getQueuedPiece() {
    let gameSpec = this.props.gameSpec;
    let blockSize = gameSpec.get('blockSize');
    let queuedSquares = this.props.queuedPiece;

    let rects = queuedSquares.map((c, index) => {
      return (
        <rect
          x={c.get('x') + this.props.xOffset - (blockSize)}
          y={c.get('y') + this.props.yOffset + (4 * blockSize)}
          width={blockSize}
          height={blockSize}
          fill={c.get('color')}
          key={index}
        />
      )
    });

    return rects;
  }

  render() {
    let gameSpec = this.props.gameSpec;
    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    return (
      <g>
        <rect
          x={this.props.xOffset}
          y={this.props.yOffset}
          width={widthRatio * blockSize}
          height={(heightRatio * blockSize) / 2}
          fill="#E4F2F7"
        />
        {this.getQueuedPiece()}
      </g>
    )
  }
}
