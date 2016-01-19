import * as Immutable from 'immutable'
import { getColor } from './helpers.js'

// Return new state representing an object with currentPiece
// mapping to object of its attributes.
function setInitialState(state, incomingData) {
  let [width, height] = incomingData.dimensions
  let { blockSize } = incomingData;

  let xCurrentPiece = (width / 2) * blockSize;
  let yCurrentPiece = 0;

  let nextState = {currentPiece: {blockCoordinates: [[xCurrentPiece,
                                                      yCurrentPiece]],
                   color: getColor()}}

  return state.merge(nextState)
}

// Return new state with all yCoordinates of currentPiece
// descended by the size of the block.
function descend(state, incomingData) {
  let newState = state.updateIn(['currentPiece', 'blockCoordinates'],
    (pairs) => {
      return pairs.map(
        (pair) => {
          return pair.update('1',
            (yValue) => {
              return yValue + 20
            }
          )
        }
      )
    });

  return newState;
}

function moveLeft(state, incomingData) {
  let newState = state.updateIn(['currentPiece', 'blockCoordinates'],
    (pairs) => {
      return pairs.map(
        (pair) => {
          return pair.update('0',
            (xValue) => {
              return xValue - 20
            }
          )
        }
      )
    });

  return newState; 
}

function moveRight(state, incomingData) {
  let newState = state.updateIn(['currentPiece', 'blockCoordinates'],
    (pairs) => {
      return pairs.map(
        (pair) => {
          return pair.update('0',
            (xValue) => {
              return xValue + 20
            }
          )
        }
      )
    });

  return newState;   
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
