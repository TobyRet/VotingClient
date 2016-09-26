import React from 'react'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'
import {List, Map} from 'immutable'
import Results from '../../src/components/Results'
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
})
