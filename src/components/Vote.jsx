import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
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
    return <div className='voting'>
      <div className='row'>
        {this.getPair().map(entry =>
          <div key={entry} className='col-md-6'>
            <div className='centre-align'>
              <button className='btn btn-outline-secondary set-btn-width'
                disabled={this.isDisabled()}
                onClick={() => this.props.vote(entry)}>
                <h1 className='vote-title'>{entry}</h1>
                {this.hasVotedFor(entry)
                  ? <div className='label'>Thanks for voting!</div>
                  : null}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  }
})
