"use strict"

import React from 'react'

export class Score extends React.Component {
  formatTime(secondsElapsed) {
    let mins = Math.floor(secondsElapsed / 60);
    let secs = secondsElapsed % 60;

    let isMinSingleDigit = mins < 10;
    let isSecSingleDigit = secs < 10;

    let minString = isMinSingleDigit ? "0" + mins.toString() : mins.toString();
    let secString = isSecSingleDigit ? "0" + secs.toString() : secs.toString();

    return minString + ":" + secString;
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
          height={((heightRatio / 2) * blockSize)}
          fill="#F3FCFF"
        />
        <text
          x={this.props.xOffset + 40}
          y={this.props.yOffset + 110}
          className="score"
        >
          {this.formatTime(this.props.secondsElapsed)}
        </text>
      </g>
    )
  }
}
