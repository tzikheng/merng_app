const { UserInputError } = require('apollo-server')
const Product = require('../../models/Product.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Mutation: {
    createReview: async(_, { productId, rating, body }, context) => {
      const user = checkAuth(context)
      if(body.trim()===''){
        throw new UserInputError('Empty review body', {
          errors: {
            body: 'Review body must not be empty'
          }
        })
      }
      const product = await Product.findById(productId)
      if(product){
        product.reviews.unshift({
          rating,
          body,
          user: user.id,
          createdAt: new Date().toISOString()
        })
        await product.save()
        return product
      } else throw new UserInputError('Product not found')
    },
    async likeReview(_, { productId, reviewId }, context) {
      try{
        const user = checkAuth(context)
        const product = await Product.findById(productId)
        const review = product.reviews.filter((review) => review.id.toString() === reviewId)[0]
        if (review.likes.find((like) => like.user.toString() === user.id)){
          review.likes = review.likes.filter((like) => like.user.toString() !== user.id)
        } else {
          review.likes.push({
            createdAt: new Date().toISOString(),
            user: user.id
          })
          }
          await product.save()
          return(review)
        } catch(err) {
        console.log(err) // throw new Error(err)
      }
    },
    async deleteReview(_, { productId, reviewId}, context){
      const user = checkAuth(context)
      try{
        const product = await Product.findById(productId)
        product.reviews = product.reviews.filter((review) => review.id.toString() !== reviewId)
        await product.save()
        return product
      } catch(err) {
        console.log(err) // throw new Error(err)
      }
    }
  }
}