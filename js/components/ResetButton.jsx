"use strict"

import React from 'react'

export class ResetButton extends React.Component {
  handleClick() {
    this.props.resetGame();
  }

  render() {
    let gameSpec = this.props.gameSpec;
    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    return (
      <text
        x={this.props.xOffset + 100}
        y={this.props.yOffset + 160}
        textAnchor="middle"
        className="reset"
        onClick={this.handleClick.bind(this)}
      >
        RESET
      </text>
    )
  }
}
