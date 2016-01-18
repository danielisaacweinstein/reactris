export function setInitialState() {
  return {
    type: 'SET_INITIAL_STATE',
    data: {
      dimensions: [10, 20],
      blockSize: 10
    }
  }
}