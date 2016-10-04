import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return <div>
      <h3 className='display-4 heading-centre'>The winner is {this.props.winner}!</h3>
      <div className='centre-align'>
        <button ref='next' className='next btn btn-lg btn-outline-secondary' onClick={this.props.reset}>
          New vote
        </button>
      </div>
    </div>
  }
})
