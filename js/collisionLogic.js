import * as Immutable from 'immutable'

function getBoundaries(boundaryPieces, gameSpec) {
  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');

  for (let i = 0; i < widthRatio; i++) {
    boundaryPieces = boundaryPieces.push(
      Immutable.fromJS({x: i * blockSize, y: heightRatio * blockSize})
    )
  }

  for (let i = 0; i < heightRatio; i++) {
    boundaryPieces = boundaryPieces.push(
      Immutable.fromJS({x: widthRatio * blockSize, y: i * blockSize})
    )
  }

  for (let i= 0; i < heightRatio; i++) {
    boundaryPieces = boundaryPieces.push(
      Immutable.fromJS({x: 0 - blockSize, y: i * blockSize})
    )
  }

  return boundaryPieces;
}

export function getCollisionDetector(state, liveIndex, deadIndex) {
  return function() {
    let livePiece = state.get('livePiece');
    let boundaryPieces = state.get('deadPieces');
    let gameSpec = state.get('gameSpec');

    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    boundaryPieces = getBoundaries(boundaryPieces, gameSpec);

    let isHitting = boundaryPieces.reduce((deadAlreadyHit, deadSquare) => {
      let deadDetectedNewHit = livePiece.reduce((liveAlreadyHit, liveSquare) => {
        let liveCorner = [liveSquare.get('x') + liveIndex[0] * blockSize,
                          liveSquare.get('y') + liveIndex[1] * blockSize];
        let deadCorner = [deadSquare.get('x') + deadIndex[0] * blockSize,
                          deadSquare.get('y') + deadIndex[1] * blockSize];

        let xCoordsMatch = liveCorner[0] == deadCorner[0];
        let yCoordsMatch = liveCorner[1] == deadCorner[1];

        let liveDetectedNewHit = xCoordsMatch && yCoordsMatch;

        return liveAlreadyHit || liveDetectedNewHit;
      }, false);

      return deadAlreadyHit || deadDetectedNewHit;
    }, false)

    return isHitting;
  }
}

export function doesOverlap(state, currentPiece) {
  let deadPieces = state.get('deadPieces');
  let gameSpec = state.get('gameSpec');

  let boundaryPieces = getBoundaries(deadPieces, gameSpec);

  let foundHit = boundaryPieces.reduce((boundaryAlreadyOverlaps, boundaryPiece) => {
    let currentPieceFoundHit = currentPiece.reduce((pieceAlreadyOverlaps, square) => {
      let currentlyHitting = boundaryPiece.get('x') == square.get('x') &&
                             boundaryPiece.get('y') == square.get('y');

      return pieceAlreadyOverlaps || currentlyHitting;
    }, false);
    return boundaryAlreadyOverlaps || currentPieceFoundHit;
  }, false);

  return foundHit;
}
