import React from 'react'
import Winner from './Winner.jsx'
import Vote from './Vote.jsx'

export default React.createClass({
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
    console.log('PROPS', this.props)
    return <div>
      {this.props.winner
        ? <Winner ref='winner' winner={this.props.winner} />
        : <Vote {... this.props} />}
    </div>
  }
})
