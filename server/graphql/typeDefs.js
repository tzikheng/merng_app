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
    cart: [CartItem]
  }
  type CartItem{
    id: ID!
    productId: String!
    quantity: Int!
    price: Float!
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
    images: [String]
    avgRating: Float
    reviews: [Review]
    reviewCount: Int!
    likes: [Like]
    likeCount: Int!
    createdAt: String!
    updatedAt: String!
    status: String!
  }
  type Review{
    body: String!
    createdAt: String!
    id: ID!
    likes: [Like]
    likeCount: Int!
    rating: Int!
    user: User!
  }

# Queries, mutations, inputs
  type Query{
    getUser(userId: ID!): User
    getUsers: [User]
    getPost(parentId: ID!): Post
    posts: [Post]
    getProduct(productId: ID!): Product
    products: [Product]
    getCart: User
  }

  type Mutation{
    register(registerInput: registerInput): User!
    login(username: String!, password: String!): User!
    updateSettings(settingsInput: settingsInput): User!
    deleteAllUsers: String
    
    createPost(body: String!): Post!
    likePost(postId: ID!): Post!
    deletePost(parentId: ID!): String!
    deleteAllPosts: String

    createComment(postId: ID!, body: String!): Post!
    deleteComment(parentId: ID!, childId: ID!): Post!
    likeComment(postId:ID!, commentId: ID!): Comment!

    createProduct(
      product_name: String!, 
      price: String!,
      condition: String!,
      description: String, 
      images: String): Product!
    likeProduct(productId: ID!): Product!
    deleteProduct(parentId: ID!): String!
    deleteAllProducts: String

    createReview(
      productId: ID!, 
      rating: Int!, 
      body: String!): Product!
    likeReview(productId: ID!, reviewId: ID!): Review!
    deleteReview(parentId: ID!, childId: ID!): Product!

    addToCart(productId: ID!): User
    removeFromCart(productId: ID!): User
    updateCart(productId: ID!, quantity: Int!): User
    clearCart: String!
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