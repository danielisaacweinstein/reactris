"use strict"

import React from 'react'
import classNames from 'classnames'

export class PlayButton extends React.Component {
  handleClick() {
    let isPaused = this.props.isPaused;
    if (this.props.gameLost) {
      this.props.resetGame();
    } else if (this.props.isPaused) {
      this.props.playTimers();
    } else {
      this.props.pauseTimers();
    }
  }

  render() {
    let gameSpec = this.props.gameSpec;
    let gameLost = this.props.gameLost;
    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    let buttonText = gameLost ? "PLAY AGAIN" : "PLAY";

    let cssStyling = classNames({
      'playButton': true,
      'gameOverEmphasis': gameLost
    })

    return (
      <text
        x={this.props.xOffset + 100}
        y={this.props.yOffset + 115}
        textAnchor="middle"
        className={cssStyling}
        onClick={this.handleClick.bind(this)}
      >
        {buttonText}
      </text>
    )
  }
}
