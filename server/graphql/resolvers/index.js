const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')
const productsResolvers = require('./products')
const reviewsResolvers = require('./reviews')
const User = require('../../models/User.js')

module.exports = {
  Post: {
    likeCount(parent){
      return parent.likes.length
    },
    commentCount(parent){
      return parent.comments.length
    },
    user(parent){
      return User.findById(parent.user._id)
    }
  },

  Comment: {
    user(parent){
      return User.findById(parent.user._id)
    }
  },

  Like: {
    user(parent){
      return User.findById(parent.user._id)
    }
  },

  Product : {
    likeCount(parent){
      return parent.likes.length
    },
    reviewCount(parent){
      return parent.reviews.length
    },
    user(parent){
      return User.findById(parent.user._id)
    },
    avgRating(parent){
      if(parent.reviews.length===0){
        console.log("No reviews yet")
        return 0
      }else{
        let sum = 0
        parent.reviews.forEach(review => {
          sum += review.rating
        });
        return (sum/parent.reviews.length).toFixed(2)
      }
    }
  },

  Review: {
    likeCount(parent){
      return parent.likes.length
    },
    user(parent){
      return User.findById(parent.user._id)
    }
  },

  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
    ...commentsResolvers.Query,
    ...productsResolvers.Query,
    ...reviewsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...productsResolvers.Mutation,
    ...reviewsResolvers.Mutation,
  },
  // TODO:
  // Subscription: {
  //   ...postsResolvers.Subscription
  // },

}