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
    type: "DESCEND"
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

// export function moveLeft() {
//   return {
//     type: "MOVE_LEFT"
//   }
// }

// export function moveRight() {
//   return {
//     type: "MOVE_RIGHT"
//   }
// }

export function rotate() {
  return {
    type: "ROTATE"
  }
}