const User = require('../../models/User.js')
const Product = require('../../models/Product.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Query:{
    async getCart(context){
      try{
        const user = checkAuth(context)
        return user
      } catch(err){console.log(err)}
    }
  },

  Mutation:{
    async addToCart(_, { productId }, context){
      console.log('addToCart called')
      try {
        const this_user = checkAuth(context)
        const user = await User.findById(this_user.id)
        let cartItem = user.cart.find(cartItem => cartItem.productId === productId)
        if (cartItem) {
          cartItem.quantity+=1
        } else {
          user.cart.push({
            productId,
            quantity: 1
          }) // FIXME: error adding product to cart
        }
        await user.save()
        console.log(user.cart)
        // return user
      } catch(err) {console.log(err)}
    },

    async removeFromCart(_, { productId }, context){
      console.log('removeFromCart called')
      console.log(productId)
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
        console.log(user.cart)
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