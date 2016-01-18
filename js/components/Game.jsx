"use strict"

import React from 'react'
import { PlayingField } from './PlayingField.jsx'

export class Game extends React.Component {
  render() {
    return (
      <svg width="480" height="480">
        <PlayingField />
      </svg>
    );
  }
}
