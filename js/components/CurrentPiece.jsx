"use strict"

import React from 'react'

export class CurrentPiece extends React.Component {
  render() {
    let gameSpecs = this.props.gameSpecs;

    return (
      <rect x="10" y="10" width="24" height="24" fill="black" />
    );
  }
}
