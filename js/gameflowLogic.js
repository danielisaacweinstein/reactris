import * as Immutable from 'immutable'
import { getColor } from './helpers.js'

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

export function lockFallingPiece(state) {
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
