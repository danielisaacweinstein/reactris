import * as Immutable from 'immutable'

// Return new state representing an object with currentPiece
// mapping to object of its attributes.
function setInitialState(state, incomingData) {
  let width = incomingData.dimensions[0];
  let height = incomingData.dimensions[1];
  let blockSize = incomingData.blockSize;

  let xCurrentPiece = (width / 2) * blockSize;
  let yCurrentPiece = 0;

  let initialPiece = {
    blockCoordinates: [xCurrentPiece, yCurrentPiece]
  }

  let nextState = {currentPiece:
                    {blockCoordinates: [[xCurrentPiece,
                                        yCurrentPiece]]}
                  }

  return state.merge(nextState)
}

function reducer(state = Immutable.Map(), action) {
  console.log(action.type);
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return setInitialState(state, action.data);
  }
  return state;
}

export default reducer
