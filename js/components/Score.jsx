"use strict"

import React from 'react'

export class Score extends React.Component {
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
          height={((heightRatio / 2) * blockSize)}
          fill="#F3FCFF"
        />
        <text
          x={this.props.xOffset + 40}
          y={this.props.yOffset + 110}
          className="score"
        >
          05:15
        </text>
      </g>
    )
  }
}
