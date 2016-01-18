"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { setInitialState } from './actions.js'
import { TetrisContainer } from './components/Tetris.jsx'

const store = createStore(reducer);

store.dispatch(setInitialState());

ReactDOM.render(
  <Provider store={store}>
    <TetrisContainer />
  </Provider>,
  document.getElementById('react')
)
