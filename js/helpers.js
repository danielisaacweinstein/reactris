import * as Immutable from 'immutable'

export function initiateNewFallingPiece(state) {
  let widthRatio = state.getIn(['gameSpec', 'widthRatio']);
  let heightRatio = state.getIn(['gameSpec', 'heightRatio']);
  let blockSize = state.getIn(['gameSpec', 'blockSize']);

  state = state.update('livePiece', () => {
    return Immutable.fromJS([{
      x: (widthRatio / 2) * blockSize,
      y: 0,
      color: getColor()
    }])
  });

  return state;
}

export function lockFallingBlocks(state) {
  let livePiece = state.get('livePiece');
  let deadPieces = state.get('deadPieces');

  while(livePiece.size > 0) {
    let blockToLock = livePiece.last();
    deadPieces = deadPieces.push(blockToLock);
    livePiece = livePiece.pop();
  }

  state = state.update('livePiece', () => {return livePiece});
  state = state.update('deadPieces', () => {return deadPieces});

  return state;
}

export function hasPieceHitBottom(state) {
  let livePiece = state.get('livePiece');
  let deadPieces = state.get('deadPieces');
  let gameSpec = state.get('gameSpec')

  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');

  for (let i = 0; i < widthRatio; i++) {
    deadPieces = deadPieces.push(Immutable.fromJS({
      x: i * blockSize,
      y: heightRatio * blockSize
    }))
  }

  let isHittingBottom = deadPieces.reduce(function(deadAlreadyHit, deadSquare) {
    let deadDetectedNewHit = livePiece.reduce(function(liveAlreadyHit, liveSquare) {
      let liveCorner = [liveSquare.get('x'),
                        liveSquare.get('y') + blockSize];
      let deadCorner = [deadSquare.get('x'),
                        deadSquare.get('y')];

      let xCoordsMatch = liveCorner[0] == deadCorner[0];
      let yCoordsMatch = liveCorner[1] == deadCorner[1];

      let liveDetectedNewHit = xCoordsMatch && yCoordsMatch

      return liveAlreadyHit || liveDetectedNewHit;
    }, false);

    return deadAlreadyHit || deadDetectedNewHit;
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
