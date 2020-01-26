const router = require('express').Router()
const {User, Transaction, Stock} = require('../db/models')
module.exports = router

// /api/user/

router.get('/', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {id: req.user.id}})
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/transaction', async (req, res, next) => {
  try {
    let {symbol, quantity, pps, action} = req.body

    let user = await User.findByPk(req.user.id)

    if (user === null) {
      res.status(401).send('Unauthorized')
    }

    let newTransaction = await Transaction.build({
      userId: user.id,
      quantity,
      symbol,
      action,
      pps,
      price: quantity * pps
    })

    let userAction = await user[newTransaction.action](
      newTransaction.symbol,
      newTransaction.quantity,
      newTransaction.pps
    )

    if (userAction) {
      await newTransaction.save()
      await user.save()
      res.status(200).send('Success')
    } else {
      res.status(400).send('Invalid Request')
    }
  } catch (err) {
    next(err)
  }
})
