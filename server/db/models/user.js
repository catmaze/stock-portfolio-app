const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 5000
  },
  assets: {
    type: Sequelize.JSON
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

User.prototype.buy = function(symbol, quantity, pps) {
  let price = pps * quantity

  if (this.balance < price) {
    return false
  } else {
    this.balance -= price
    if (this.assets === null || !this.assets.hasOwnProperty(symbol)) {
      this.assets = {...this.assets, [symbol]: quantity}
    } else {
      this.assets[symbol] += quantity
    }
    return true
  }
}

User.prototype.sell = function(symbol, quantity, pps) {
  //selling
  if (this.assets === null || this.assets[symbol] < quantity) {
    return false
  } else {
    this.assets[symbol] -= quantity
    this.balance += pps * quantity
    if (this.assets[symbol] === 0) {
      delete this.assets[symbol]
    }
  }
  return true
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
