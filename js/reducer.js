import * as Immutable from 'immutable'

function setInitialState(state, incomingData) {
  let gameDimensions = {x: incomingData.dimensions[0],
                        y: incomingData.dimensions[1]}
  let size = {blockSize: incomingData.blockSize};

  return state.merge({dimensions: gameDimensions},
                     size)
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
