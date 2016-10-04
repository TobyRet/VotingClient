import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'
import {describe, it} from 'mocha'
import reducer from '../src/reducer'

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({Trainspotting: 1})
        })
      })
    }
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('handles SET_STATE with a plain JS payload', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        }
      }
    }
    const nextState = reducer(initialState, action)
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('sets "has voted" after voting', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    })
    const action = {type: 'VOTE', entry: 'Trainspotting'}
    const nextState = reducer(state, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    }))
  })

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    })

    const action = {type: 'VOTE', entry: 'Sunshine'}
    const nextState = reducer(state, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }))
  })

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    })

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', 'Slumdog Millionaire']
        }
      }
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Slumdog Millionaire']
      }
    }))
  })
})
