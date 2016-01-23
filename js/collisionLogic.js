import * as Immutable from 'immutable'

export function getCollisionDetector(state, liveSquareIndex, deadSquareIndex) {
  return function() {
    let livePiece = state.get('livePiece');
    let boundaryPieces = state.get('deadPieces');
    let gameSpec = state.get('gameSpec');

    let widthRatio = gameSpec.get('widthRatio');
    let heightRatio = gameSpec.get('heightRatio');
    let blockSize = gameSpec.get('blockSize');

    // Construct boundaries
    for (let i = 0; i < widthRatio; i++) {
      boundaryPieces = boundaryPieces.push(
        Immutable.fromJS({x: i * blockSize, y: heightRatio * blockSize})
      )
      boundaryPieces = boundaryPieces.push(
        Immutable.fromJS({x: widthRatio * blockSize, y: i * blockSize})
      )
      boundaryPieces = boundaryPieces.push(
        Immutable.fromJS({x: 0 - blockSize, y: i * blockSize})
      )
    }

    let isHitting = boundaryPieces.reduce(function(deadAlreadyHit, deadSquare) {
      let deadDetectedNewHit = livePiece.reduce(function(liveAlreadyHit, liveSquare) {
        let liveCorner = [liveSquare.get('x') + liveSquareIndex[0] * blockSize,
                          liveSquare.get('y') + liveSquareIndex[1] * blockSize];
        let deadCorner = [deadSquare.get('x') + deadSquareIndex[0] * blockSize,
                          deadSquare.get('y') + deadSquareIndex[1] * blockSize];

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
