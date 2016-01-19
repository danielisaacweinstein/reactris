"use strict"

import React from 'react'

export class CurrentPiece extends React.Component {

  getBlocks(current) {
    let coordinatePairs = current.get('blockCoordinates').toJS()
    let rects = coordinatePairs.map((c, index) => {
      return (
        <rect
          x={c[0]}
          y={c[1]}
          width="20"
          height="20"
          fill="black"
          key={index}
        />
      )
    });

    return rects;
  }

  render() {

    return (
      <g>
        {this.getBlocks(this.props.currentPiece)}
      </g>
    )
  }
}
