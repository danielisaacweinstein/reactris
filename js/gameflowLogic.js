import * as Immutable from 'immutable'

import { getIPiece,
        getLPiece,
        getTPiece,
        getOPiece,
        getSPiece,
        getZPiece,
        getJPiece } from './pieceCreators.js'

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

  // let newPiece = getNewPiece();

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
