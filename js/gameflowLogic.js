import * as Immutable from 'immutable'

import { getIPiece,
        getLPiece,
        getTPiece,
        getOPiece,
        getSPiece,
        getZPiece,
        getJPiece } from './pieceCreators.js'

export function attemptCollapse(state) {
  let { widthRatio, heightRatio, blockSize } = state.get('gameSpec').toJS();
  let deadPieces = state.get('deadPieces');

  for (let i = 0; i < heightRatio; i ++) {
    let yIndex = i * blockSize;

    let deadPiecesInRow = deadPieces.filter((square) => {
      return square.get('y') == yIndex;
    });

    if (deadPiecesInRow.size == widthRatio) {
      // Delete blocks
      while (deadPiecesInRow.size > 0) {
        let currentDeadPiece = deadPiecesInRow.last();
        deadPiecesInRow = deadPiecesInRow.pop();

        let indexToDelete = deadPieces.findIndex((deadPiece) => {
          return (deadPiece.get('x') == currentDeadPiece.get('x') &&
                  deadPiece.get('y') == currentDeadPiece.get('y'))
        })

        deadPieces = deadPieces.delete(indexToDelete);
      }
      // Downshift blocks above yIndex
      deadPieces = deadPieces.map((currentPiece) => {
        let currentY = currentPiece.get('y');

        let isAbove = currentY < yIndex;

        if (isAbove) {
          return currentPiece.update('y', () => {return currentY + blockSize});
        } else {
          return currentPiece.update('y', () => {return currentY});
        }
      })

    }
    state = state.update('deadPieces', () => {return deadPieces});
  }

  return state;
}

function getPieceCreator(gameSpec) {
  return function() {
    let creators = [getIPiece, getLPiece, getTPiece, getOPiece,
                    getSPiece, getZPiece, getJPiece]

    let randomIndex = Math.floor(Math.random() * creators.length);

    return creators[randomIndex](gameSpec);
  }
}

export function initiateNewLivePiece(state) {
  let getNewPiece = getPieceCreator(state.get('gameSpec'));

  state = state.update('livePiece', () => {
    return Immutable.fromJS(getNewPiece());
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
