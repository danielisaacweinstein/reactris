import * as Immutable from 'immutable'
import { getColor } from './helpers.js'
import { hasPieceHitBottom,
         hasPieceHitLeft,
         hasPieceHitRight } from './collisionLogic.js'
import { lockFallingPiece,
         initiateNewFallingPiece } from './gameflowLogic.js'

// Return new state representing an object with currentPiece
// mapping to object of its attributes.
function setInitialState(state, incomingData) {
  let initialState = {
    gameSpec: {
      widthRatio: incomingData.dimensions[0],
      heightRatio: incomingData.dimensions[1],
      blockSize: incomingData.blockSize
    },
    livePiece: [{
      x: (incomingData.dimensions[0] / 2) * incomingData.blockSize,
      y: 0,
      color: getColor()
    }],
    deadPieces: []
  }

  return state.merge(initialState)
}

// Return new state with all yCoordinates of currentPiece
// descended by the size of the block.
function descend(state, incomingData) {
  if (!hasPieceHitBottom(state)) {
    state = state.update('livePiece',
      (blocks) => {
        return blocks.map(
          (block) => {
            return block.update('y', (yValue) => yValue + 20)
          }
        )
      }
    )
  } else {
    state = lockFallingPiece(state);
    state = initiateNewFallingPiece(state);
  }

  return state;
}

function moveLeft(state, incomingData) {
  if (!hasPieceHitLeft(state)) {
    state = state.update('livePiece',
      (blocks) => {
        return blocks.map(
          (block) => {
            return block.update('x', (xValue) => xValue - 20)
          }
        )
      }
    )    
  }

  return state; 
}

function moveRight(state, incomingData) {
  if (!hasPieceHitRight(state)) {
    state = state.update('livePiece',
      (blocks) => {
        return blocks.map(
          (block) => {
            return block.update('x', (xValue) => xValue + 20)
          }
        )
      }
    )    
  }

  return state;  
}

function reducer(state = Immutable.Map(), action) {
  console.log(action.type);
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return setInitialState(state, action.data);
    case 'DESCEND':
      return descend(state, action.data);
    case 'MOVE_LEFT':
      return moveLeft(state, action.data);
    case 'MOVE_RIGHT':
      return moveRight(state, action.data);
  }
  return state;
}

export default reducer
