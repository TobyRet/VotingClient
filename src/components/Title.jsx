import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return <div className='row'>
      <h1 className='display-1 heading-centre'>VOTING MACHINE</h1>
      <h3 className='display-5 instructions'>How do you like your Brexit?</h3>
    </div>
  }
})
