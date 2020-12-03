const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Mutation: {
    createComment: async(_, { postId, body }, context) => {
      const { username } = checkAuth(context)
      if(body.trim()===''){
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        })
      }
      const post = await Post.findById(postId)
      if(post){
        post.comments.unshift({ // add to top
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post;
      } else throw new UserInputError('Post not found')
    },

    async deleteComment(_, { postId, commentId}, context){
      const { username } = checkAuth(context);
      const post = await Post.findById(postId)
      if(post){
        const commentIndex = post.comments.findIndex(comment=>comment.id===commentId)
        if(post.comments[commentIndex].username === username){
          post.comments.splice(commentId,1)
          await post.save()
          return post
        } else {throw new AuthenticationError('Action not allowed')}
      } else {throw new UserInputError('Post not found')}
    }
  }
}