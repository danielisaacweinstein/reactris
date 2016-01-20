import * as Immutable from 'immutable'
import { getColor,
         hasPieceHitBottom,
         lockFallingBlocks,
         initiateNewFallingPiece } from './helpers.js'

// Return new state representing an object with currentPiece
// mapping to object of its attributes.
function setInitialState(state, incomingData) {
  let nextState = {
    gameSpec: {
      widthRatio: incomingData.dimensions[0],
      heightRatio: incomingData.dimensions[1],
      blockSize: incomingData.blockSize
    },
    fallingPieces: [{
      x: (incomingData.dimensions[0] / 2) * incomingData.blockSize,
      y: 0,
      color: getColor()
    }],
    fallenPieces: []
  }

  return state.merge(nextState)
}

// Return new state with all yCoordinates of currentPiece
// descended by the size of the block.
function descend(state, incomingData) {
  let nextState = Immutable.Map();

  if (!hasPieceHitBottom(state)) {
    nextState = state.update('fallingPieces',
      (blocks) => {
        return blocks.map(
          (block) => {
            return block.update('y', (yValue) => yValue + 20)
          }
        )
      }
    )
  } else {
    nextState = lockFallingBlocks(state);
    nextState = initiateNewFallingPiece(nextState);
  }

  return nextState;
}

function moveLeft(state, incomingData) {
  let nextState = state.update('fallingPieces',
    (blocks) => {
      return blocks.map(
        (block) => {
          return block.update('x', (xValue) => xValue - 20)
        }
      )
    }
  )

  return nextState; 
}

function moveRight(state, incomingData) {
  let nextState = state.update('fallingPieces',
    (blocks) => {
      return blocks.map(
        (block) => {
          return block.update('x', (xValue) => xValue + 20)
        }
      )
    }
  )

  return nextState;  
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
