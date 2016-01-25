import * as Immutable from 'immutable'
import { getColor } from './helpers.js'
import { getCollisionDetector,
         hasPieceHitBottom,
         hasPieceHitLeft,
         hasPieceHitRight } from './collisionLogic.js'
import { lockLivePiece,
         createLivePiece,
         queueNewPiece,
         makeQueuedPieceLive,
         attemptCollapse,
         getPieceCreator } from './gameflowLogic.js'

// Return new state representing an object with currentPiece
// mapping to object of its attributes.
function setInitialState(state, incomingData) {
  let width = incomingData.dimensions[0];
  let height = incomingData.dimensions[1];
  let size = incomingData.blockSize;

  let initialState = Immutable.fromJS({
    gameSpec: {
      widthRatio: width,
      heightRatio: height,
      blockSize: size
    },
    isPaused: true,
    secondsElapsed: 0,
    livePiece: [],
    deadPieces: [],
    queuedPiece: []
  });

  initialState = createLivePiece(initialState);
  initialState = queueNewPiece(initialState);

  return state.merge(initialState)
}

// Return new state with all yCoordinates of currentPiece
// descended by the size of the block.
function descend(state, incomingData) {
  let isHittingBottom = getCollisionDetector(state, [0, 1], [0, 0]);

  if (!isHittingBottom()) {
    state = state.update('livePiece', (blocks) => {
      return blocks.map((block) => {
        return block.update('y', (yValue) => yValue + 20);
      });
    });
  } else {
    state = lockLivePiece(state);
    // state = createLivePiece(state);
    state = makeQueuedPieceLive(state);
    state = queueNewPiece(state);
  }

  return attemptCollapse(state);
}

function moveHorizontal(state, incomingData) {
  let blockSize = state.getIn(['gameSpec', 'blockSize']);
  let xShift = incomingData.shift;
  let isLeft = xShift === -1;

  let [liveIndex, deadIndex] = isLeft ? [[0, 0], [1, 0]] : [[1, 0], [0, 0]];

  let isHittingSide = getCollisionDetector(state, liveIndex, deadIndex);

  if (!isHittingSide()) {
    state = state.update('livePiece', (blocks) => {
      return blocks.map((block) => {
        return block.update('x', (xValue) => xValue + xShift * blockSize);
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

function incrementTime(state, incomingData) {
  return state.update('secondsElapsed', (alreadyElapsed) => {
    return alreadyElapsed + 1;
  });
}

function togglePause(state, incomingData) {
  return state.update('isPaused', () => {
    return state.get('isPaused') ? false : true;
  })
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
    case 'MOVE_HORIZONTAL':
      return moveHorizontal(state, action.data);
    case 'ROTATE':
      return rotate(state, action.data);
    case 'INCREMENT_TIME':
      return incrementTime(state, action.data);
    case 'TOGGLE_PAUSE':
      return togglePause(state, action.data);
  }
  return state;
}

export default reducer
