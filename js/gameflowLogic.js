import * as Immutable from 'immutable'

import { getIPiece,
         getLPiece,
         getTPiece,
         getOPiece,
         getSPiece,
         getZPiece,
         getJPiece } from './pieceCreators.js'

function deleteRowFromState(state, row) {
  let deadPieces = state.get('deadPieces');

  while (row.size > 0) {
    let square = row.last();
    row = row.pop();

    let squareIndex = deadPieces.findIndex((deadBlock) => {
      return (deadBlock.get('x') == square.get('x') &&
              deadBlock.get('y') == square.get('y'))
    })

    deadPieces = deadPieces.delete(squareIndex);
    state = state.update('deadPieces', () => {return deadPieces});
  }

  return state;
}

function downshiftDeadBlocks(state, yIndex) {
  let deadPieces = state.get('deadPieces');
  let blockSize = state.getIn(['gameSpec', 'blockSize']);

  deadPieces = deadPieces.map((currentPiece) => {
    let currentY = currentPiece.get('y');
    let isAbove = currentY < yIndex;
    let shiftValue = isAbove ? blockSize : 0;

    return currentPiece.update('y', () => {return currentY + shiftValue});
  })

  return state.update('deadPieces', () => {return deadPieces});
}

export function attemptCollapse(state) {
  let { widthRatio, heightRatio, blockSize } = state.get('gameSpec').toJS();
  let deadPieces = state.get('deadPieces');

  for (let i = 0; i < heightRatio; i ++) {
    let yIndex = i * blockSize;

    let deadPiecesInRow = deadPieces.filter((square) => {
      return square.get('y') == yIndex;
    });

    if (deadPiecesInRow.size == widthRatio) {
      state = deleteRowFromState(state, deadPiecesInRow);
      state = downshiftDeadBlocks(state, yIndex);
    }
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
