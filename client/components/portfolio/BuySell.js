import React from 'react'

export default class BuySell extends React.Component {
  constructor(props) {
    super()
    this.state = {symbol: '', quantity: 0}
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    //make dispatch
  }
  render() {
    return (
      <div className="buy-sell box-container">
        <h2>Cash - ${props.balance}</h2>
        <form className="auth-form" onSubmit={props.handleSubmit}>
          <div>
            <input
              name="symbol"
              type="text"
              placeholder="Ticker"
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
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Buy</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
      </div>
    )
  }
}
