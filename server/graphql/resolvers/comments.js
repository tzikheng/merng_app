const { UserInputError } = require('apollo-server')
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
    async likeComment(_, { postId, commentId }, context) {
      try{
        const user = checkAuth(context)
        const post = await Post.findById(postId)
        const comment = post.comments.filter((comment) => comment.id.toString() === commentId)[0]
        if (comment.likes.find((like) => like.user.toString() === user.id)){
          comment.likes = comment.likes.filter((like) => like.user.toString() !== user.id)
        } else {
          comment.likes.push({
            createdAt: new Date().toISOString(),
            user: user.id
          })
        }
          await post.save()
          return(comment)
        } catch(err) {
        console.log(err) // throw new Error(err)
      }
    },
    async deleteComment(_, { parentId, childId}, context){
      const user = checkAuth(context);
      try{
        const post = await Post.findById(parentId)
        post.comments = post.comments.filter((comment) => comment.id.toString() !== childId)
        // TODO: post owner can delete all comments
        await post.save()
        return post
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}