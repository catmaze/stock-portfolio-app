import React from 'react'
import PropTypes from 'prop-types'

export default function ListAssets({assets, pps}) {
  let mappedAssets = Object.keys(assets).map(symbol => (
    <div key={`sym-${symbol}`} className="asset-listing box-container">
      <span>
        {symbol} - {assets[symbol]} shares
      </span>
      <span>${assets[symbol] * pps[symbol]}</span>
    </div>
  ))

  return <div className="list-of-assets">{mappedAssets}</div>
}

/**
 * PROP TYPES
 */
ListAssets.propTypes = {
  assets: PropTypes.object
}
