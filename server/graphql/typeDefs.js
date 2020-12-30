// const gql = require('graphql-tag')
const { gql } = require('apollo-server')

module.exports = gql`

# Type definitions 
  type User{
    id: ID!
    username: String!
    avatar: String
    color: String
    bio: String
    email: String!
    token: String!
    createdAt: String!
  }
  type Post{
    id: ID!
    body: String!
    user: User!
    comments: [Comment]
    commentCount: Int!
    likes: [Like]
    likeCount: Int!
    createdAt: String!
  }
  type Comment{
    id: ID!
    body: String!
    user: User!
    likes: [Like]
    likeCount: Int!
    createdAt: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    user: User!
  }
  type Product{
    id: ID!
    user: User!
    product_name: String!
    description: String!
    condition: String!
    price: Float!
    pictures: [String]
    avgRating: Float
    reviews: [Review]
    reviewCount: Int!
    likes: [Like]
    likeCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Review{
    id: ID!
    rating: Int!
    body: String!
    likes: [Like]
    likeCount: Int!
    user: User!
    createdAt: String!
  }

# Queries, mutations, inputs
  type Query{
    getUser(userId: ID!): User
    getUsers: [User]
    getPost(postId: ID!): Post
    posts: [Post]
    getProduct(productId: ID!): Product
    products: [Product]
  }

  type Mutation{
    register(registerInput: registerInput): User!
    login(username: String!, password: String!): User!
    updateSettings(settingsInput: settingsInput): User!
    deleteAllUsers: String
    
    createPost(body: String!): Post!
    likePost(postId: ID!): Post!
    deletePost(postId: ID!): String!
    deleteAllPosts: String

    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(postId:ID!, commentId: ID!): Comment!

    createProduct(product_name: String!, description: String!, condition: String!, price: Float!): Product!
    likeProduct(productId: ID!): Product!
    deleteProduct(productId: ID!): String!
    deleteAllProducts: String

    createReview(productId: ID!, rating: Int!, body: String!): Product!
    likeReview(productId: ID!, reviewId: ID!): Review!
    deleteReview(productId: ID!, reviewId: ID!): Product!
  }
  
  input registerInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input settingsInput{
    avatar: String
    bio: String
    color: String
    username: String
  }
  # type Subscription{
  #   # TODO: implement user_id based subscription
  #   newPost: Post!
  # }
`