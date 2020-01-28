const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Stock

// fetch("https://sandbox.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_2ae2cee0eb7e431aa5a907bbdf09b8d6",
//   {
//     "credentials": "include",
//     "headers": {
//       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
//       "accept-language": "en-US,en;q=0.9,it;q=0.8,la;q=0.7",
//       "cache-control": "max-age=0",
//       "upgrade-insecure-requests": "1"
//     },
//     "referrerPolicy": "no-referrer-when-downgrade",
//     "body": null,
//     "method": "GET",
//     "mode": "cors"
//   });
