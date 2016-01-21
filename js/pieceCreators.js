import * as Immutable from 'immutable'
import { getColor } from './helpers.js'

export function getTPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let tPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: blockSize,
    color: currentColor
  }];

  return tPiece;
}

export function getIPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let iPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (3 * blockSize),
    y: 0,
    color: currentColor
  }]

  return iPiece;
}

export function getLPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let lPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: blockSize,
    color: currentColor
  }]

  return lPiece;
}

export function getJPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let jPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: blockSize,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: 0,
    color: currentColor
  }]

  return jPiece;
}

export function getOPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let oPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: (widthRatio / 2) * (blockSize),
    y: blockSize,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: blockSize,
    color: currentColor
  }]

  return oPiece;
}

export function getSPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let sPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: blockSize,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: blockSize,
    color: currentColor
  }]

  return sPiece;
}

export function getZPiece(gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');
  let currentColor = getColor();

  let zPiece = [{
    x: (widthRatio / 2) * blockSize,
    y: blockSize,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: blockSize,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (1 * blockSize),
    y: 0,
    color: currentColor
  }, {
    x: ((widthRatio / 2) * (blockSize)) + (2 * blockSize),
    y: 0,
    color: currentColor
  }]

  return zPiece;
}
