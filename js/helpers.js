import * as Immutable from 'immutable'

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

  debugger;

  let isHittingBottom = fallenPieces.reduce(function(fallenHit, fallenBlock) {
    let didHitBlock = fallingPieces.reduce(function(fallingHit, fallingBlock) {
      let fallingBottom = [fallingBlock.get('x'),
                           fallingBlock.get('y') + gameSpec.get('blockSize')];
      let fallenTop = [fallenBlock.get('x'),
                       fallenBlock.get('y')];

      let xCoordsMatch = fallingBottom[0] == fallenTop[0];
      let yCoordsMatch = fallingBottom[1] == fallenTop[1];

      let hitFound = (xCoordsMatch && yCoordsMatch) ? true : false

      return hitFound;
    }, false);

    return false || didHitBlock
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


