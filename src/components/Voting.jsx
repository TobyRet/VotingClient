import React from 'react'
import Winner from './Winner.jsx'
import Vote from './Vote.jsx'
import Title from './Title.jsx'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as actionCreators from '../action_creators'
import {connect} from 'react-redux'

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function () {
    return this.props.pair || []
  },
  isDisabled: function () {
    return !!this.props.hasVoted
  },
  hasVotedFor: function (entry) {
    return this.props.hasVoted === entry
  },
  render: function () {
    return <div>
      <Title />
      { this.props.winner
        ? <Winner ref='winner' winner={this.props.winner} />
        : <Vote {... this.props} /> }
    </div>
  }
})

function mapStateToProps (state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting)
