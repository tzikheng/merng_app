import gql from 'graphql-tag'

const REGISTER_USER = gql`
mutation register(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
){
  register(
    registerInput:{
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    }
  ){
    id
    email
    username
    createdAt
    token
  }
}
`

const LOGIN_USER = gql`
mutation login(
  $username: String!
  $password: String!
  ){
    login(
      username: $username
      password: $password
      ){
        id
        email
        username
        token
      }
  }
`

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
  createPost(body: $body){
    id
    body
    createdAt
    username
    likeCount
    likes{
      username
      createdAt
    }
    commentCount
    comments{
      id
      body
      username
      createdAt
    }
  }
}
`

const GET_POST_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`

const GET_POSTS_QUERY = gql`
  {
    getPosts{
      id
      username
      body
      createdAt
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
  likePost(postId: $postId){
    id
    username
    likeCount
    likes {
      username
    }
  }
}
`

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
  deletePost(postId: $postId)
}
`

export { REGISTER_USER, LOGIN_USER, CREATE_POST_MUTATION, 
  GET_POSTS_QUERY, GET_POST_QUERY, LIKE_POST_MUTATION,
  DELETE_POST_MUTATION}