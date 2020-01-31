import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {sentBuyOrder} from '../../store/user'

class BuySell extends React.Component {
  constructor(props) {
    super()
    this.state = {symbol: '', quantity: 0}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await sentBuyOrder(this.state.symbol, this.state.quantity)
  }
  render() {
    return (
      <div className="buy-sell box-container">
        <h2>Cash - ${this.props.balance}</h2>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <div>
            <input
              name="symbol"
              type="text"
              placeholder="Ticker"
              value={this.state.symbol}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="quantity"
              type="number"
              min="1"
              step="1"
              placeholder="Qty"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Buy</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => dispatch(sentBuyOrder())

export default connect(null, mapDispatch)(BuySell)

BuySell.propTypes = {
  symbol: PropTypes.string,
  quantity: PropTypes.number,
  error: PropTypes.object
}
