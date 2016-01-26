"use strict"

import React from 'react'

export class Timer extends React.Component {
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
      <text
        x={this.props.xOffset + 100}
        y={this.props.yOffset + 100}
        textAnchor="middle"
        className="time"
      >
        {this.formatTime(this.props.secondsElapsed)}
      </text>
    )
  }
}

