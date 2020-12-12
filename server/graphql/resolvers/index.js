const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')
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
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
    ...commentsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
}