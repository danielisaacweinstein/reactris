"use strict"

import React from 'react'
import classNames from 'classnames'

export class ResetButton extends React.Component {
  handleClick() {
    this.props.resetGame();
  }

  render() {
    let gameSpec = this.props.gameSpec;
    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    let cssStyling = classNames({
      'reset': true,
      'gameOverDeemphasis': this.props.gameLost
    })

    return (
      <text
        x={this.props.xOffset + 100}
        y={this.props.yOffset + 160}
        textAnchor="middle"
        className={cssStyling}
        onClick={this.handleClick.bind(this)}
      >
        RESET
      </text>
    )
  }
}
