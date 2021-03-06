const { AuthenticationError, UserInputError } = require('apollo-server')
const checkAuth = require('../../utility/check-auth.js')
const Post = require('../../models/Post.js')

module.exports = {
  Query:{
    async posts(){
      try{
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch(err){
        // throw new Error(err)
        console.log(err)
      }
    },

    async getPost(_, { parentId }){
      try{
        const post = await Post.findById(parentId)
        if(post){
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch(err){console.log(err)}
    }
  },

  Mutation:{
    async createPost(_, { body }, context){
      const user = checkAuth(context)
      const newPost = new Post({
        user: user.id,
        body,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save()
      return post
    },

    async likePost(_, { postId }, context) {
      try {
      const user = checkAuth(context)
      const post = await Post.findById(postId)
        if (post.likes.find((like) => like.user.toString() === user.id)) {
          post.likes = post.likes.filter((like) => like.user.toString() !== user.id)
        } else {
          post.likes.push({
            createdAt: new Date().toISOString(),
            user: user.id
          })
        }
        await post.save()
        return post
      } catch(err) {console.log(err)}
    },
    
    async deletePost(_, { parentId }, context){
      const user = checkAuth(context)
      try{
        const post = await Post.findById(parentId)
        if(post.user.toString()===user.id){
          await post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {console.log(err)}
    },

    async deleteAllPosts(){
      try{
        await Post.deleteMany({})
        return 'Posts deleted'
      } catch(err) {console.log(err)}
    }
  }
    // , Subscription: {
    //   newPost :{
    //     subscribe: (_,__,{ pubsub }) => pubsub.asyncIterator('NEW_POST')
    //   }
    // }
}