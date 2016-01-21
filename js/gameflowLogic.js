import * as Immutable from 'immutable'
import { getColor } from './helpers.js'

function getTPiece(gameSpec) {
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

function getIPiece(gameSpec) {
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

function getLPiece(gameSpec) {
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

function getOPiece(gameSpec) {
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


function getPieceCreator(gameSpec) {
  return function() {
    let creators = [
      getIPiece,
      getLPiece,
      getTPiece,
      getOPiece
    ]

    let randomIndex = Math.floor(Math.random() * creators.length);

    return creators[randomIndex](gameSpec);
  }
}

export function initiateNewLivePiece(state) {
  let getNewPiece = getPieceCreator(state.get('gameSpec'));

  let newPiece = getNewPiece();

  state = state.update('livePiece', () => {
    return Immutable.fromJS(newPiece);
  });

  return state;
}

export function lockLivePiece(state) {
  let livePiece = state.get('livePiece');
  let deadPieces = state.get('deadPieces');

  while(livePiece.size > 0) {
    let squareToLock = livePiece.last();
    deadPieces = deadPieces.push(squareToLock);
    livePiece = livePiece.pop();
  }

  state = state.update('livePiece', () => {return livePiece});
  state = state.update('deadPieces', () => {return deadPieces});

  return state;
}
