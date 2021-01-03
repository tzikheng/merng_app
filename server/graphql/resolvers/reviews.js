const { UserInputError } = require('apollo-server')
const Product = require('../../models/Product.js')
const checkAuth = require('../../utility/check-auth.js')
const { validateReviewInput } = require('../../utility/validators.js')

module.exports = {
  Mutation: {
    createReview: async(_, { productId, rating, body }, context) => {
      const {errors, valid} = validateReviewInput(rating, body)
      if(!valid){
        throw new UserInputError('Review input error',{errors})
      } else {
        const user = checkAuth(context)
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
      }
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
    async deleteReview(_, { parentId, childId}, context){
      const user = checkAuth(context)
      try{
        const product = await Product.findById(parentId)
        product.reviews = product.reviews.filter((review) => review.id.toString() !== childId)
        await product.save()
        return product
      } catch(err) {
        console.log(err) // throw new Error(err)
      }
    }
  }
}