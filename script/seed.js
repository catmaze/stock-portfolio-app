'use strict'

const db = require('../server/db')
const {User, Stock, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: '',
      email: 'cody@email.com',
      password: '123'
    })
  ])

  const cody = await User.findOne({
    where: {
      email: 'cody@email.com'
    }
  })

  console.log('cody name is ', cody)

  let newStock = Stock.build({
    symbol: 'AAPL',
    price: '300'
  })
  await newStock.save()

  const stock = await Stock.findOne({
    where: {
      symbol: 'AAPL'
    }
  })

  if (stock === null) {
    console.error('stock is null, making request')
  } else {
    let req = {
      symbol: 'AAPL',
      quantity: 4,
      pps: stock.price
    }

    let newTransaction = await Transaction.build({
      userId: cody.id,
      quantity: req.quantity,
      symbol: req.symbol,
      action: 'buy',
      pps: req.pps,
      price: req.quantity * stock.price
    })

    let newTrans = await cody[newTransaction.action](
      newTransaction.symbol,
      newTransaction.quantity,
      newTransaction.pps
    )
    if (newTrans) {
      await newTransaction.save()
    }

    //sell
    let secondTransaction = await Transaction.build({
      userId: cody.id,
      quantity: 80,
      symbol: req.symbol,
      action: 'sell',
      pps: req.pps,
      price: req.quantity * stock.price
    })

    let secondTrans = await cody[secondTransaction.action](
      secondTransaction.symbol,
      secondTransaction.quantity,
      secondTransaction.pps
    )

    if (secondTrans) {
      await secondTransaction.save()
    }
    await cody.save()
  }

  // console.log('\ncody :: \n', cody)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
