"use strict"

import React from 'react'
import { PlayingField } from './PlayingField.jsx'

export class Game extends React.Component {
  render() {
    let gameSpec = this.props.gameSpec;

    // Create SVG with width double that of playing field
    return (
      <svg
        width={gameSpec.get('widthRatio') * gameSpec.get('blockSize') * 2}
        height={gameSpec.get('heightRatio') * gameSpec.get('blockSize')}>
        <PlayingField
          gameSpec={gameSpec}
          fallingPieces={this.props.fallingPieces}
        />
      </svg>
    );
  }
}
