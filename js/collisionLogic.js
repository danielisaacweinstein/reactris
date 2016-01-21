import * as Immutable from 'immutable'

export function hasPieceHitRight(state) {
  let livePiece = state.get('livePiece');
  let boundaryPieces = state.get('deadPieces');
  let gameSpec = state.get('gameSpec')

  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');

  // Construct boundary right of field
  for (let i = 0; i < heightRatio; i++) {
    boundaryPieces = boundaryPieces.push(Immutable.fromJS({
      x: widthRatio * blockSize,
      y: i * blockSize
    }))
  }

  let isHittingRight = boundaryPieces.reduce(function(deadAlreadyHit, deadSquare) {
    let deadDetectedNewHit = livePiece.reduce(function(liveAlreadyHit, liveSquare) {
      let liveCorner = [liveSquare.get('x') + blockSize,
                        liveSquare.get('y')];
      let deadCorner = [deadSquare.get('x'),
                        deadSquare.get('y')];

      let xCoordsMatch = liveCorner[0] == deadCorner[0];
      let yCoordsMatch = liveCorner[1] == deadCorner[1];

      let liveDetectedNewHit = xCoordsMatch && yCoordsMatch;

      return liveAlreadyHit || liveDetectedNewHit;
    }, false);

    return deadAlreadyHit || deadDetectedNewHit;
  }, false)

  return isHittingRight;
}

export function hasPieceHitLeft(state) {
  let livePiece = state.get('livePiece');
  let boundaryPieces = state.get('deadPieces');
  let gameSpec = state.get('gameSpec')

  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');

  // Construct boundary left of field
  for (let i = 0; i < heightRatio; i++) {
    boundaryPieces = boundaryPieces.push(Immutable.fromJS({
      x: 0 - blockSize,
      y: i * blockSize
    }))
  }

  let isHittingLeft = boundaryPieces.reduce(function(deadAlreadyHit, deadSquare) {
    let deadDetectedNewHit = livePiece.reduce(function(liveAlreadyHit, liveSquare) {
      let liveCorner = [liveSquare.get('x'),
                        liveSquare.get('y')];
      let deadCorner = [deadSquare.get('x') + blockSize,
                        deadSquare.get('y')];

      let xCoordsMatch = liveCorner[0] == deadCorner[0];
      let yCoordsMatch = liveCorner[1] == deadCorner[1];

      let liveDetectedNewHit = xCoordsMatch && yCoordsMatch;

      return liveAlreadyHit || liveDetectedNewHit;
    }, false);

    return deadAlreadyHit || deadDetectedNewHit;
  }, false)

  return isHittingLeft;
}

export function hasPieceHitBottom(state) {
  console.log("line 80")
  let livePiece = state.get('livePiece');
  let boundaryPieces = state.get('deadPieces');
  let gameSpec = state.get('gameSpec')

  let widthRatio = gameSpec.get('widthRatio');
  let heightRatio = gameSpec.get('heightRatio');
  let blockSize = gameSpec.get('blockSize');

  // Construct boundary along bottom row
  for (let i = 0; i < widthRatio; i++) {
    boundaryPieces = boundaryPieces.push(Immutable.fromJS({
      x: i * blockSize,
      y: heightRatio * blockSize
    }))
  }

  let isHittingBottom = boundaryPieces.reduce(function(deadAlreadyHit, deadSquare) {
    let deadDetectedNewHit = livePiece.reduce(function(liveAlreadyHit, liveSquare) {
      console.log("line 99")
      let liveCorner = [liveSquare.get('x'),
                        liveSquare.get('y') + blockSize];
      let deadCorner = [deadSquare.get('x'),
                        deadSquare.get('y')];

      let xCoordsMatch = liveCorner[0] == deadCorner[0];
      let yCoordsMatch = liveCorner[1] == deadCorner[1];

      let liveDetectedNewHit = xCoordsMatch && yCoordsMatch;

      return liveAlreadyHit || liveDetectedNewHit;
    }, false);

    return deadAlreadyHit || deadDetectedNewHit;
  }, false);

  return isHittingBottom;
}
