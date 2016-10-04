import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Winner from './Winner'
import Title from'./Title'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function () {
    return this.props.pair || []
  },
  getVotes: function (entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry)
    }
    return 0
  },
  render: function () {
    if (this.props.winner) {
      return <div>
        <Title />
        <Winner ref='winner' winner={this.props.winner} />
      </div>
    } else {
      return <div className='results'>
        <h1 className='display-1 heading-centre'>RESULTS</h1>
        <div className='tally'>
          {this.getPair().map(entry =>
            <div key={entry} className='entry centre-align'>
              <h3 className='display-3 results'>{entry} ... <span className='tally'>{this.getVotes(entry)}</span></h3>
            </div>
          )}
        </div>
        <div className='management centre-align'>
          <button ref='next' className='next btn btn-lg btn-outline-secondary' onClick={this.props.next}>
            Next voting pair
          </button>
        </div>
      </div>
    }
  }
})

function mapStateToProps (state) {
  console.log(state)
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results)
