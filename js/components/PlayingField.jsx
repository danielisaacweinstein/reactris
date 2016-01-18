"use strict"

import React from 'react'
import { CurrentBlock } from './CurrentBlock.jsx'
import { FallenBlocks } from './FallenBlocks.jsx'

export class PlayingField extends React.Component {
  render() {
    return (
      <g>
        <rect x="240" y="0" width="240" height="480" fill="#E6E6FA">
        </rect>
        <CurrentBlock />
        <FallenBlocks />
      </g>
    );
  }
}
