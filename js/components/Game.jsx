"use strict"

import React from 'react'
import { PlayingField } from './PlayingField.jsx'
import { QueuedPiece } from './QueuedPiece.jsx'
import { ControlPanel } from './ControlPanel.jsx'

export class Game extends React.Component {
  render() {
    let gameSpec = this.props.gameSpec;
    let blockSize = gameSpec.get('blockSize');
    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');

    return (
      <svg
        width={widthRatio * blockSize * 2}
        height={heightRatio * blockSize}>
        <PlayingField
          gameSpec={gameSpec}
          xOffset={0}
          yOffset={0}
          livePiece={this.props.livePiece}
          deadPieces={this.props.deadPieces}
        />
        <QueuedPiece
          gameSpec={gameSpec}
          xOffset={widthRatio * blockSize}
          yOffset={0}
          queuedPiece={this.props.queuedPiece}
        />
        <ControlPanel
          gameSpec={gameSpec}
          xOffset={widthRatio * blockSize}
          yOffset={heightRatio * blockSize / 2}
          secondsElapsed={this.props.secondsElapsed}
          isPaused={this.props.isPaused}
          playTimers={this.props.playTimers}
          pauseTimers={this.props.pauseTimers}
          resetGame={this.props.resetGame}
        />
      </svg>
    );
  }
}
