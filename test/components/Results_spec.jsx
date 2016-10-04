import React from 'react'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import {List, Map} from 'immutable'
import {Results} from '../../src/components/Results'
import {expect} from 'chai'
import {describe, it} from 'mocha'

describe('Results', () => {
  it('renders results with vote counts or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later')
    const tally = Map({'Trainspotting': 5})
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    )
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry')
    const [trainspotting, TwentyEightDaysLater] = entries.map(e => e.textContent)

    expect(entries.length).to.eql(2)
    expect(trainspotting).to.contain('Trainspotting')
    expect(trainspotting).to.contain('5')
    expect(TwentyEightDaysLater).to.contain('28 Days Later')
    expect(TwentyEightDaysLater).to.contain('0')
  })
  it('invokes the next callback when the next callback is clicked', () => {
    let nextInvoked = false
    const next = () => { nextInvoked = true }

    const pair = List.of('Trainspotting', '28 Days Later')
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    )
    Simulate.click(ReactDOM.findDOMNode(component.refs.next))

    expect(nextInvoked).to.equal(true)
  })

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner='Trainspotting' pair={['Trainspotting', '28 Days Later']} tally={Map()} />
    )
    const winner = ReactDOM.findDOMNode(component.refs.winner)
    expect(winner).to.be.ok
    expect(winner.textContent).to.contain('Trainspotting')
  })
})
