const {Stock} = require('../db/models')
const {IEX_TOKEN} = require('../../secrets')
const axios = require('axios')

module.exports = async function(symbol) {
  try {
    let stock = await Stock.findOne({
      where: {
        symbol
      }
    })

    if (stock === null) {
      let newStock
      const iexRes = await axios.get(
        `https://sandbox.iexapis.com/stable/${symbol}/quote?token=${IEX_TOKEN}`
      )

      if (!iexRes.data.hasOwnProperty(latestPrice)) {
        newStock = await Stock.build({symbol, price: 0})
      } else {
        newStock = await Stock.build({
          symbol,
          price: iexRes.data.latestPrice * 100
        })
      }
      newStock.save()
      return newStock
    } else {
      return stock
    }
  } catch (error) {
    return error
  }
}
// if (Date(stock.updatedAt) - Date() > 1000000) {
// if stock needs update
// make api call
// }

// if (stock === null || Date(stock.updatedAt) - Date() > 1000000) {
//   // make api call
//   let newStock
//   const iexRes = await axios.get(`https://sandbox.iexapis.com/stable/${symbol}/quote?token=${IEX_TOKEN}`)

//   if (!iexRes.data.hasOwnProperty(latestPrice)) {
//     // if API fails
//     newStock = await Stock.build({symbol, price: 0})
//   } else {
//     if(stock === null) {
//       newStock = await Stock.build({symbol, price: iexRes.data.latestPrice*100})
//     }
//   }

// update stock
// save stock
// send pps
