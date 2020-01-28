import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import BuySell from './BuySell'
import ListAssets from './ListAssets'
/**
 * COMPONENT
 */
export class Portfolio extends React.Component {
  constructor(props) {
    super()
    this.state = {
      balance: 0,
      assets: {},
      pps: {AAPL: 300},
      combinedAssets: 0
    }
  }

  componentDidMount() {
    let combinedAssets = Object.keys(this.props.assets).reduce(
      (acc, curr) => acc + this.props.assets[curr] * this.state.pps[curr],
      0
    )
    this.setState({
      balance: this.props.balance,
      assets: this.props.assets,
      combinedAssets
    })
  }

  render() {
    const {balance, assets, combinedAssets, pps} = this.state
    return (
      <div id="portfolio">
        <h1>Portfolio ${combinedAssets}</h1>
        <div className="portfolio-container">
          {Object.keys(assets).length === 0 ? (
            <p>No Assets</p>
          ) : (
            <ListAssets assets={assets} pps={pps} />
          )}
          <BuySell balance={balance} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    balance: state.user.balance,
    assets: state.user.assets
  }
}

export default connect(mapState)(Portfolio)

/**
 * PROP TYPES
 */
Portfolio.propTypes = {
  balance: PropTypes.string,
  assets: PropTypes.object
}
