import * as Immutable from 'immutable'

export function initiateNewFallingPiece(state) {
  let widthRatio = state.getIn(['gameSpec', 'widthRatio']);
  let heightRatio = state.getIn(['gameSpec', 'heightRatio']);
  let blockSize = state.getIn(['gameSpec', 'blockSize']);

  state = state.update('fallingPieces', () => {
    return Immutable.fromJS([{
      x: (widthRatio / 2) * blockSize,
      y: 0,
      color: getColor()
    }])
  });

  return state;
}

export function lockFallingBlocks(state) {
  let fallingPieces = state.get('fallingPieces');
  let fallenPieces = state.get('fallenPieces');

  while(fallingPieces.size > 0) {
    let blockToLock = fallingPieces.last();
    fallenPieces = fallenPieces.push(blockToLock);
    fallingPieces = fallingPieces.pop();
  }

  state = state.update('fallingPieces', () => {return fallingPieces});
  state = state.update('fallenPieces', () => {return fallenPieces});

  return state;
}

export function hasPieceHitBottom(state) {
  let fallingPieces = state.get('fallingPieces');
  let fallenPieces = state.get('fallenPieces');
  let gameSpec = state.get('gameSpec')

  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');

  for (let i = 0; i < widthRatio; i++) {
    fallenPieces = fallenPieces.push(Immutable.fromJS({
      x: i * blockSize,
      y: heightRatio * blockSize
    }))
  }

  let isHittingBottom = fallenPieces.reduce(function(didFallenHit, fallenBlock) {
    let didHitBlock = fallingPieces.reduce(function(didFallingHit, fallingBlock) {
      let fallingBottom = [fallingBlock.get('x'),
                           fallingBlock.get('y') + gameSpec.get('blockSize')];
      let fallenTop = [fallenBlock.get('x'),
                       fallenBlock.get('y')];

      let xCoordsMatch = fallingBottom[0] == fallenTop[0];
      let yCoordsMatch = fallingBottom[1] == fallenTop[1];

      let hitFound = xCoordsMatch && yCoordsMatch

      return didFallingHit || hitFound;
    }, false);

    return didFallenHit || didHitBlock
  }, false);

  return isHittingBottom;
}


export function getColor() {
  let colors = [
    "#2e86ab",
    "#a23b72",
    "#f18f01",
    "#c73e1d",
    "#3b1f2b"
  ]

  return colors[Math.floor(Math.random() * colors.length)];
}
