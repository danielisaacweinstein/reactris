import * as Immutable from 'immutable'

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
