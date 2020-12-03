const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post.js')
const checkAuth = require('../../utility/check-auth.js')

module.exports = {
  Query:{
    async getPosts(){
      try{
        const posts = await Post.find().sort({ createdAt: -1 }) // no condition, select *
        return posts
      } catch(err){
        throw new Error(err)
      }
    },

    async getPost(_, { postId }){
      try{
        const post = await Post.findById(postId)
        if(post){
          return post;
        } else {
          throw new Error('Post not found')
        }
      } catch(err){
        throw new Error(err)
      }
    }
  },

  Mutation:{ // DO NOT add the authetication middleware for express itself, it will run even on unprotected routes
    async createPost(_, { body }, context){
      if (body.trim()===''){
        throw new UserInputError('Post body must not be empty')
      }
      const user = checkAuth(context)
      const newPost = new Post({
        body,
        user: user.id, // change back to user
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save()
      context.pubsub.publish('NEW_POST',{
        newPost: post
      })
      return post
    },

    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    
    async deletePost(_, { postId }, context){
      const user = checkAuth(context);
      try{
        const post = await Post.findById(postId)
        if(user.username === post.username){
          await post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }} catch(err) {
          throw new Error(err)
        }
      },

    async deleteAllPosts(){
      try{
        await Post.deleteMany({})
        return 'Posts deleted'
      } catch(err) {
        throw new Error(err)
      }
    }
  }

    // , Subscription: {
    //   newPost :{
    //     subscribe: (_,__,{ pubsub }) => pubsub.asyncIterator('NEW_POST')
    //   }
    // }
}