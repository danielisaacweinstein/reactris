"use strict"

import React from 'react'
import { Timer } from './Timer.jsx'
import { PlayButton } from './PlayButton.jsx'
import { ResetButton } from './ResetButton.jsx'

export class ControlPanel extends React.Component {
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
        <Timer
          gameSpec={this.props.gameSpec}
          xOffset={this.props.xOffset}
          yOffset={this.props.yOffset}
          secondsElapsed={this.props.secondsElapsed}
        />
        <PlayButton
          gameSpec={this.props.gameSpec}
          xOffset={this.props.xOffset}
          yOffset={this.props.yOffset}
          isPaused={this.props.isPaused}
          playTimers={this.props.playTimers}
          pauseTimers={this.props.pauseTimers}
        />
        <ResetButton
          gameSpec={this.props.gameSpec}
          xOffset={this.props.xOffset}
          yOffset={this.props.yOffset}
          resetGame={this.props.resetGame}
        />
      </g>
    )
  }
}

