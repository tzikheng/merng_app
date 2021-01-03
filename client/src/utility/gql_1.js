import gql from 'graphql-tag'

const REGISTER_USER = gql`
mutation register(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
){
  register(
    registerInput: {
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    }
  ){
    avatar
    bio
    color
    createdAt
    email
    id
    token
    username
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
      avatar
      bio
      color
      createdAt
      email
      id
      token
      username
    }
  }
`

const GET_USER_QUERY = gql`
query($userId: ID!){
  getUser(userId: $userId){
    avatar
    bio
    color
    id
    username
  }
}
`

const UPDATE_SETTINGS = gql`
mutation updateSettings(
  $avatar: String
  $bio: String
  $color: String
  $username: String
){
  updateSettings(
    settingsInput: {
      avatar: $avatar
      bio: $bio
      color: $color
      username: $username
    }
  ){
    avatar
    bio
    color
    createdAt
    email
    id
    token
    username
  }
}
`

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
  createPost(body: $body){
    body
    commentCount
    comments{body createdAt id user{avatar color id username}}
    createdAt
    id
    likeCount
    likes{id createdAt user{id username}}
    user{avatar color id username}
  }
}
`

const GET_POST_QUERY = gql`
query($parentId: ID!){
  getPost(parentId: $parentId){
    body
    commentCount
    comments{body createdAt id user{avatar color id username}}
    createdAt
    id
    likeCount
    likes{id createdAt user{id username}}
    user{avatar color id username}
  }
}
`

const GET_POSTS_QUERY = gql`
{
  posts{
  body
  commentCount
  comments{body createdAt id user{avatar color id username}}
  createdAt
  id
  likeCount
  likes{id createdAt user{id username}}
  user{id username avatar color}
  }
}
`

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
  likePost(postId: $postId){
    body
    commentCount
    comments{body createdAt id user{avatar color id username}}
    createdAt
    id
    likeCount
    likes{id createdAt user{id username}}
    user{id username avatar color}
  }
}
`

const DELETE_POST_MUTATION = gql`
mutation deletePost($parentId: ID!){
  deletePost(parentId: $parentId)
}
`

const CREATE_COMMENT_MUTATION = gql`
mutation($postId: ID!, $body: String!){
  createComment(postId: $postId, body: $body){
    body
    commentCount
    comments{body createdAt id user{avatar color id username}}
    createdAt
    id
    likeCount
    likes{id createdAt user{id username}}
    user{id username avatar color}
  }
}
`

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($parentId:ID!, $childId:ID!){
  deleteComment(parentId: $parentId, childId: $childId){
    body
    commentCount
    comments{body createdAt id user{avatar color id username}}
    createdAt
    id
    likeCount
    likes{id createdAt user{id username}}
    user{id username avatar color}
  }
}
`

export { REGISTER_USER, LOGIN_USER, GET_USER_QUERY, UPDATE_SETTINGS,
  CREATE_POST_MUTATION, GET_POST_QUERY, GET_POSTS_QUERY, DELETE_POST_MUTATION, 
  LIKE_POST_MUTATION, CREATE_COMMENT_MUTATION, DELETE_COMMENT_MUTATION}