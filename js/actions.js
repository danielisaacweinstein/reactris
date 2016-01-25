export function setInitialState() {
  return {
    type: 'SET_INITIAL_STATE',
    data: {
      dimensions: [10, 20],
      blockSize: 20
    }
  }
}

export function descend() {
  return {
    type: 'DESCEND'
  }
}

export function moveHorizontal(xShift) {
  return {
    type: 'MOVE_HORIZONTAL',
    data: {
      shift: xShift
    }
  }
}

export function rotate() {
  return {
    type: 'ROTATE'
  }
}

export function incrementTime() {
  return {
    type: 'INCREMENT_TIME'
  }
}

export function pause() {
  return {
    type: 'PAUSE'
  }
}

export function play() {
  return {
    type: 'PLAY'
  }
}
