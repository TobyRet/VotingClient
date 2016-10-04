import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import io from 'socket.io-client'
import {VotingContainer} from './components/Voting'
import {ResultsContainer} from './components/Results'
import reducer from './reducer'
import {setState} from './action_creators'
import remoteActionMiddleware from './remote_action_middleware'
import App from './components/App'

const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`)
socket.on('state', state =>
  store.dispatch(setState(state))
)
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)
const store = createStoreWithMiddleware(reducer)

socket.on('state', state =>
  store.dispatch({type: 'SET_STATE', state})
)

const routes = <Route component={App}>
  <Route path='/results' component={ResultsContainer} />
  <Route path='/' component={VotingContainer} />
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

