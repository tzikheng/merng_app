const User = require('../../models/User.js')
const Product = require('../../models/Product.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Query:{
    async getCart(_, __, context){
      try{
        const this_user = checkAuth(context)
        const user = await User.findById(this_user.id)
        return user
      } catch(err){
        throw new Error(err)
      }
    }
  },

  Mutation:{
    async addToCart(_, { productId }, context){
      try {
        const this_user = checkAuth(context)
        const user = await User.findById(this_user.id)
        const product = await Product.findById(productId)
        let cartItem = user.cart.find(cartItem => cartItem.productId === productId)
        if (cartItem) {
          cartItem.quantity+=1
        } else {
          user.cart.push({
            productId,
            quantity: 1,
            price: product.price
          })
        }
        await user.save()
        return user
      } catch(err) {console.log(err)}
    },

    async removeFromCart(_, { productId }, context){
      try {
        const this_user = checkAuth(context)
        const user = await User.findById(this_user.id)
        let cartItem = user.cart.find(cartItem => cartItem.productId === productId)
        if (cartItem.quantity === 1){
          user.cart = user.cart.filter((cartItem) => cartItem.productId !== productId)
        } else {
          cartItem.quantity -= 1
        }
        await user.save()
        return user
      } catch(err) {console.log(err)}
    },

    async updateCart(_, { productId, quantity }, context){
      try {
        const this_user = checkAuth(context)
        const user = await User.findById(this_user.id)
        let cartItem = user.cart.find(cartItem => cartItem.productId === productId)
        cartItem.quantity = quantity
        await user.save()
        return user
      } catch(err) {console.log(err)}
    },

    async clearCart(){
      const this_user = checkAuth(context)
      const user = await User.findById(this_user.id.toString())
      user.cart = []
      await user.save()
      return 'Cart cleared'
    }
  }
}