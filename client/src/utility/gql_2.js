import gql from 'graphql-tag'

const CREATE_PRODUCT_MUTATION = gql`
mutation createProduct(
  $product_name: String!, 
  $condition: String!,
  $price: String!, #TODO: FLOAT 
  $description: String,
  $images: String){
    createProduct(
      product_name: $product_name,
      price: $price,
      condition: $condition,
      description: $description,
      images: $images){
        avgRating
        condition
        createdAt
        description
        id
        likeCount
        likes{id createdAt user{id username}}
        images
        price
        product_name
        reviewCount
        reviews{rating body createdAt id user{avatar color id username}}
        updatedAt
        user{id username avatar color}
      }
    }
`

const GET_PRODUCT_QUERY = gql`
query($productId: ID!){
  getProduct(productId: $productId){
  avgRating
  condition
  createdAt
  description
  id
  likeCount
  likes{id createdAt user{id username}}
  images
  price
  product_name
  reviewCount
  reviews{rating body createdAt id user{avatar color id username}}
  updatedAt
  user{id username avatar color}
  }
}
`

const GET_PRODUCTS_QUERY = gql`
{
  products{
    avgRating
    condition
    createdAt
    description
    id
    likeCount
    likes{id createdAt user{id username}}
    images
    price
    product_name
    reviewCount
    reviews{rating body createdAt id user{avatar color id username}}
    updatedAt
    user{id username avatar color}
  }
}
`

const LIKE_PRODUCT_MUTATION = gql`
mutation likeProduct($productId: ID!){
  likeProduct(productId: $productId){
    avgRating
    condition
    createdAt
    description
    id
    likeCount
    likes{id createdAt user{id username}}
    images
    price
    product_name
    reviewCount
    reviews{rating body createdAt id user{avatar color id username}}
    updatedAt
    user{id username avatar color}
  }
}
`

const DELETE_PRODUCT_MUTATION = gql`
mutation deleteProduct($parentId: ID!){
  deleteProduct(parentId: $parentId)
}
`

const CREATE_REVIEW_MUTATION = gql`
mutation($productId: ID!, $rating: Int!, $body: String!){
  createReview(productId: $productId, rating: $rating, body: $body){
    avgRating
    condition
    createdAt
    description
    id
    likeCount
    likes{id createdAt user{id username}}
    images
    price
    product_name
    reviewCount
    reviews{rating body createdAt id user{avatar color id username}}
    updatedAt
    user{id username avatar color}
  }
}
`

const LIKE_REVIEW_MUTATION = gql`
mutation likeReview($productId: ID!, $reviewId: ID){
  likeReview(productId: $productId, reviewId: $reviewId){
    body
    createdAt
    id
    likes
    likeCount
    rating
    user
  }
}
`

const DELETE_REVIEW_MUTATION = gql`
mutation deleteReview($parentId: ID!, $childId: ID!){
  deleteReview(parentId: $parentId, childId: $childId){
    avgRating
    condition
    createdAt
    description
    id
    likeCount
    likes{id createdAt user{id username}}
    images
    price
    product_name
    reviewCount
    reviews{rating body createdAt id user{avatar color id username}}
    updatedAt
    user{id username avatar color}
  }
}
`

const ADD_TO_CART = gql`
mutation addToCart($productId: ID!){
  addToCart(productId: $productId){
    cart{
      productId
      quantity
    }
  }
}
`

const REMOVE_FROM_CART = gql`
mutation removeFromCart($productId: ID!){
  removeFromCart(productId: $productId){
    cart{
      productId
      quantity
    }
  }
}
`

const UPDATE_CART = gql`
mutation updateCart($productId: ID!, $quantity: Int!){
  updateCart(productId: $productId, quantity: $quantity){
    cart{
      productId
      quantity
    }
  }
}
`

const GET_CART = gql`
{
  getCart{
    cart{
      productId
      quantity
      price
    }
  }
}
`

export { 
  CREATE_PRODUCT_MUTATION, GET_PRODUCT_QUERY, GET_PRODUCTS_QUERY, LIKE_PRODUCT_MUTATION, DELETE_PRODUCT_MUTATION, 
  CREATE_REVIEW_MUTATION, LIKE_REVIEW_MUTATION, DELETE_REVIEW_MUTATION, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, GET_CART}