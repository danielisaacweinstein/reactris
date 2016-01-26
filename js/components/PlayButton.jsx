
"use strict"

import React from 'react'

export class PlayButton extends React.Component {
  handleClick() {
    let isPaused = this.props.isPaused;
    isPaused ? this.props.playTimers() : this.props.pauseTimers();
  }

  render() {
    let gameSpec = this.props.gameSpec;
    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    return (
      <text
        x={this.props.xOffset + 100}
        y={this.props.yOffset + 140}
        textAnchor="middle"
        className="pause"
        onClick={this.handleClick.bind(this)}
      >
        {this.props.isPaused ? "PLAY" : "PAUSE"}
      </text>
    )
  }
}
