import * as Immutable from 'immutable'
import { getColor } from './helpers.js'
import { hasPieceHitBottom,
         hasPieceHitLeft,
         hasPieceHitRight } from './collisionLogic.js'
import { lockLivePiece,
         initiateNewLivePiece } from './gameflowLogic.js'

// Return new state representing an object with currentPiece
// mapping to object of its attributes.
function setInitialState(state, incomingData) {
  let initialState = Immutable.fromJS({
    gameSpec: {
      widthRatio: incomingData.dimensions[0],
      heightRatio: incomingData.dimensions[1],
      blockSize: incomingData.blockSize
    },
    livePiece: [],
    deadPieces: []
  })

  initialState = initiateNewLivePiece(initialState);

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
    state = lockLivePiece(state);
    state = initiateNewLivePiece(state);
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

// I'm sorry
function getRotatedSquare(pivotSquare, rotatingSquare) {
  let pivotX = pivotSquare.get('x');
  let pivotY = pivotSquare.get('y');
  let rotatingX = rotatingSquare.get('x');
  let rotatingY = rotatingSquare.get('y');

  if (rotatingX < pivotX && rotatingY == pivotY) {
    let delta = pivotX - rotatingX;
    rotatingSquare.update('x', (index) => {return index + delta});
    rotatingSquare.update('y', (index) => {return index + delta});
  } else if (rotatingX < pivotX && rotatingY < pivotY) {
    let yDelta = pivotY - rotatingY;
    rotatingSquare.update('y', (index) => {return index + (2 * yDelta)})
  } else if (rotatingX == pivotX && rotatingY < pivotY) {
    let delta = pivotY - rotatingY;
    rotatingSquare.update('x', (index) => {return index - delta});
    rotatingSquare.update('y', (index) => {return index + delta});
  } else if (rotatingX > pivotX && rotatingY < pivotY) {
    let yDelta = pivotY - rotatingY;
    rotatingSquare.update('x', (index) => {return index + (2 * yDelta)});
  } else if (rotatingX > pivotX && rotatingY == pivotY) {
    let xDelta = rotatingX - pivotX;
    rotatingSquare.update('x', (index) => {return index - xDelta});
    rotatingSquare.update('y', (index) => {return index - xDelta});    
  } else if (rotatingX > pivotX && rotatingY > pivotY) {
    let delta = rotatingX - pivotX;
    rotatingSquare.update('y', (index) => {return index - (2 * delta)});
  } else if (rotatingX == pivotX && rotatingY > pivotY) {
    let yDelta = pivotY - rotatingY;
    rotatingSquare.update('x', (index) => {return index + yDelta});
    rotatingSquare.update('y', (index) => {return index - yDelta});
  } else if (rotatingX < pivotX && rotatingY < pivotY) {
    let delta = pivotY - rotatingY;
    rotatingSquare.update('y', (index) => {return index + delta});    
  }

  debugger;

  return rotatingSquare;
}

function rotate(state, incomingData) {
  let piece = state.get('livePiece');

  let pivotSquare = piece.reduce((alreadyFoundPivot, square) => {
    let squareIsPivot = (square.get('isPivot') == true);
    return squareIsPivot ? square : alreadyFoundPivot || false
  }, false);

  piece = piece.map((square) => {
    let isPivot = square.get('isPivot') == true;
    return isPivot ? square : getRotatedSquare(pivotSquare, square)
  });

  state = state.update('livePiece', () => {return piece});

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
    case 'ROTATE':
      return rotate(state, action.data);
  }
  return state;
}

export default reducer
