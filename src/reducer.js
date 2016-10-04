import {Map, List} from 'immutable'

function resetVote (state) {
  const hasVoted = state.get('hasVoted')
  const currentPair = state.getIn(['vote', 'pair'], List())
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted')
  } else {
    return state
  }
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
      return resetVote(setState(state, action.state))
    case 'VOTE':
      return vote(state, action.entry)
  }
  return state
}

