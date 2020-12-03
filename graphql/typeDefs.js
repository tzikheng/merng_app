// const gql = require('graphql-tag')
const { gql } = require('apollo-server')

module.exports = gql`
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Post{
    id: ID!
    body: String!
    # user_id: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    commentCount: Int!
    likes: [Like]!
    likeCount: Int!
  }
  type Comment{
    id: ID!
    createdAt: String!
    # user_id: String!
    username: String!
    body: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    # user_id: String!
    username: String!
  }
  input registerInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query{
    getUsers: [User]
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation{
    register(registerInput: registerInput): User!
    login(username: String!, password: String!): User!
    deleteAllUsers: String
    
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post! #toggle
    deleteAllPosts: String

    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: ID!): Post!
  } 
  # type Subscription{
  #   # TODO: implement user_id based subscription
  #   newPost: Post!
  # }

`