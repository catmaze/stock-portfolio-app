import React from 'react'

export default function BuySell(props) {
  return (
    <div className="buy-sell box-container">
      <h2>Cash - ${props.balance}</h2>
      <form className="auth-form" onSubmit={props.handleSubmit}>
        <div>
          <input name="symbol" type="text" placeholder="Ticker" />
        </div>
        <div>
          <input
            name="quantity"
            type="number"
            min="1"
            step="1"
            placeholder="Qty"
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
