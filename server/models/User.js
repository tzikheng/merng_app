const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  avatar: String,
  bio: String,
  color: String,
  createdAt: String,
  email: String,
  password: String,
  username: String,
  cart: [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
})

module.exports = model('User', userSchema);