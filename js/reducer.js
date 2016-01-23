import * as Immutable from 'immutable'
import { getColor } from './helpers.js'
import { hasPieceHitBottom,
         hasPieceHitLeft,
         hasPieceHitRight } from './collisionLogic.js'
import { lockLivePiece,
         initiateNewLivePiece,
         attemptCollapse } from './gameflowLogic.js'

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
    state = state.update('livePiece', (blocks) => {
      return blocks.map((block) => {
        return block.update('y', (yValue) => yValue + 20);
      });
    });
  } else {
    state = lockLivePiece(state);
    state = initiateNewLivePiece(state);
  }

  return attemptCollapse(state);
}

function moveLeft(state, incomingData) {
  if (!hasPieceHitLeft(state)) {
    state = state.update('livePiece', (blocks) => {
      return blocks.map((block) => {
        return block.update('x', (xValue) => xValue - 20);
      });
    }); 
  }

  return state; 
}

function moveRight(state, incomingData) {
  if (!hasPieceHitRight(state)) {
    state = state.update('livePiece', (blocks) => {
      return blocks.map((block) => {
          return block.update('x', (xValue) => xValue + 20)
      });
    });
  }

  return state;  
}

// Apply rotation matrix to vector from index of pivot square
// to the index of rotating square.
function getRotatedSquare(pivotSquare, rotatingSquare) {
  let xDelta = rotatingSquare.get('x') - pivotSquare.get('x');
  let yDelta = rotatingSquare.get('y') - pivotSquare.get('y');

  let matrix = [[0, 1], [-1, 0]]; // Rotation matrix

  let newVector = [(matrix[0][0] * xDelta) + (matrix[0][1] * yDelta),
                   (matrix[1][0] * xDelta) + (matrix[1][1] * yDelta)]

  rotatingSquare = rotatingSquare.update('x', () => {
    return pivotSquare.get('x') + newVector[0];
  });

  rotatingSquare = rotatingSquare.update('y', () => {
    return pivotSquare.get('y') + newVector[1];
  });

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
    return isPivot ? square : getRotatedSquare(pivotSquare, square);
  });

  return state.update('livePiece', () => {return piece});
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
