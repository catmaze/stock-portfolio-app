const router = require('express').Router()

const {User} = require('../db/models')
const quote = require('./stock-quote-util')

module.exports = router

// /api/quote

router.get('/:symbols', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)

    if (user === null) {
      res.status(401).send('Unauthorized')
    }

    console.log('\n\n\nreq.params')
    console.log(req.params)
    let quotesPromise = req.body.symbols.map(symbol =>
      quote(symbol.toUpperCase())
    )

    let quotes = await Promise.all(quotesPromise)

    res.json(quotes)
  } catch (err) {
    next(err)
  }
})
