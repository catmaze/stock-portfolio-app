import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotHistory} from '../../store/history'

/**
 * COMPONENT
 */
const Transactions = props => {
  const {history} = props

  let mapHistory =
    history.length === 0
      ? null
      : history.map(trans => (
          <div key={trans.id} className="asset-listing box-container">
            <span>
              {trans.action.toUpperCase()} ({trans.symbol}) - {trans.quantity}{' '}
              Shares @ {trans.pps}
            </span>
          </div>
        ))

  return (
    <div>
      <h1>Transactions</h1>
      <div>{mapHistory}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    history: state.history
  }
}

const mapDispatch = dispatch => dispatch(gotHistory())

export default connect(mapState, mapDispatch)(Transactions)

/**
 * PROP TYPES
 */
Transactions.propTypes = {
  history: PropTypes.object
}
