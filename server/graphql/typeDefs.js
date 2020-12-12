// const gql = require('graphql-tag')
const { gql } = require('apollo-server')

module.exports = gql`
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    color: String
    bio: String
    avatar: String
  }
  type Post{
    id: ID!
    user: User!
    body: String!
    createdAt: String!
    # username: String!
    comments: [Comment]
    commentCount: Int!
    likes: [Like]
    likeCount: Int!
  }
  type Comment{
    id: ID!
    user: User!
    createdAt: String!
    body: String!
    # username: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    user: User!
    # username: String!
  }
  input registerInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query{
    getUser(userId: ID!): User
    getUsers: [User]
    posts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation{
    register(registerInput: registerInput): User!
    login(username: String!, password: String!): User!
    deleteAllUsers: String
    
    createPost(body: String!): Post!
    likePost(postId: ID!): Post!
    deletePost(postId: ID!): String!
    deleteAllPosts: String

    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    # TODO: likeComment(commentId: ID!): Comment
  } 
  type Subscription{
    # TODO: implement user_id based subscription
    newPost: Post!
  }
`