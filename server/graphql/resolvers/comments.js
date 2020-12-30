const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Mutation: {
    createComment: async(_, { postId, body }, context) => {
      const user = checkAuth(context)
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
          user: user.id,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post;
      } else throw new UserInputError('Post not found')
    },

    async deleteComment(_, { postId, commentId}, context){
      const user = checkAuth(context);
      try{
        const post = await Post.findById(postId)
        post.comments = post.comments.filter((comment) => comment.id.toString() !== commentId);
        // TODO: post owner can delete all comments
        await post.save()
        return post
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}