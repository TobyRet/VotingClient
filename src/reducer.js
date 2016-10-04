import {Map, List} from 'immutable'

function resetVote (state, mergedState) {
  const oldPair = state.getIn(['vote', 'pair'], List())
  const newPair = mergedState.getIn(['vote', 'pair'], List())
  if (mergedState.get('hasVoted') && !oldPair.equals(newPair)) {
    return mergedState.remove('hasVoted')
  }
  return mergedState
}

function setState (state, setState) {
  return state.merge(setState)
}

function vote (state, entry) {
  const currentPair = state.getIn(['vote', 'pair'])
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry)
  } else {
    return state
  }
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(state, setState(state, action.state))
    case 'VOTE':
      return vote(state, action.entry)
  }
  return state
}

