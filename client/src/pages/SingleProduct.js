import { useMutation, useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import React, { useContext, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Form, Grid, Header, Icon, Image, Label, Rating, Transition } from 'semantic-ui-react'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import { CREATE_REVIEW_MUTATION, GET_PRODUCT_QUERY } from '../utility/gql_2.js'
import AddToCartButton from '../components/AddToCartButton'

function SingleProduct(props){
  const { user } = useContext(AuthContext)
  const color = (user ? user.color : 'black')
  const productId = props.match.params.productId
  const reviewInputRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [createReview, { loading: creatingReview }] = useMutation(CREATE_REVIEW_MUTATION, {
    variables: {
      productId: productId,
      body: review,
      rating: rating},
    onError(error){
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    update(){
      setReview('')
      setRating(0)
      setErrors({})
      reviewInputRef.current.blur()
    },
  })
  const handleRate = (e, { rating }) => {
    setRating(parseInt(rating))
  }
  function deleteProductCallback(){
    props.history.push('/market')
  }
  let productMarkup

  const { loading, error, data } = useQuery(GET_PRODUCT_QUERY, {
    variables: { productId }
  })
  if(error){
    console.log(error)
    productMarkup = <p>{'Error encountered...'}</p>
  } else if(loading){
    productMarkup = (
      <Grid columns={3}>
          <Grid.Row className='page-title'>
            <h1>{'Loading...'}</h1>
          </Grid.Row>
      </Grid>
    )
  } else {
    const product = data.getProduct
    if(!product){
      productMarkup = <p>{'Product not found...'}</p>
    } else {
      productMarkup = (
        <Grid centered>
          <Grid.Row/>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image
                src={product.images[0]}
                size='medium'
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Header size='large' style={{marginTop:10, marginBottom:5}}>{product.product_name}</Header>
                {product.reviewCount > 0 && (
                  <div style={{display: 'flex', color:'black', marginTop:5, marginBottom:5, alignItems: 'center'}}>
                    <Rating size='small' defaultRating={product.avgRating} maxRating={5} disabled style={{marginRight:10}}/>
                    {product.reviewCount} 
                    <Icon 
                      name={product.reviewCount>1?'comments outline': 'comment outline'} 
                      style={{marginLeft:3}}/>
                  </div>
                )}
                <Header size='medium' style={{marginTop:5, marginBottom:5}}>{`$${product.price}`}</Header>
                <Header size='small' style={{marginTop:5, marginBottom:5}}>{`Listed ${moment(product.createdAt).fromNow()}`}</Header>
                <Header size='small' style={{marginTop:10, marginBottom:10}}>{product.description}</Header>

                <div style={{marginTop:10, marginBottom:20}}>
                  <>
                  <LikeButton 
                    color={color} 
                    type='product'
                    size='tiny'
                    float='left'
                    item={{
                      id:product.id, 
                      likeCount:product.likeCount, 
                      likes:product.likes
                    }}
                    />
                  {user && user.id===product.user.id
                      ? <DeleteButton type='product' size='tiny' float='right' parentId={product.id} callback={deleteProductCallback}/>
                      : <AddToCartButton color={color} size='tiny' float='right' productId={product.id} price={product.price} quantity={1}/>
                    }
                  </>
                </div>

                {(user && user.id !== product.user.id 
                  && !product.reviews.find((review) => review.user.id === user.id)) &&
                  <Card 
                    fluid
                    color={color}>
                    <Card.Content>
                      <Card.Header size='small'>
                        {`Leave a review`}
                      </Card.Header>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <Rating 
                          size='large' 
                          maxRating={5} 
                          onRate={handleRate} 
                          style={{marginTop:10, marginBottom:10}}
                        />
                        { errors.rating 
                          ? (
                          <Label basic color='red' pointing='left'>
                            {`Click on a star to rate this item`}
                          </Label>) 
                          : null}
                      </div>
                      <Form>
                        <div className="ui action input fluid">
                          <input
                            type="text"
                            placeholder={errors.body ? "Review must not be blank" : "Submit a review to rate this item"}
                            name="review"
                            value={review}
                            onChange={(event) => setReview(event.target.value)}
                            ref={reviewInputRef}
                            />
                          <button
                            type="submit"
                            className={`ui button ${color}`}
                            disabled={review.trim() === '' || creatingReview}
                            onClick={createReview}
                            >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Card.Content>
                  </Card>
                }

                {product.reviews && (
                  <Transition.Group>
                    {product.reviews.map((review) => (
                      <Card 
                        fluid 
                        color={color}
                        key={review.id}>
                        <Card.Content>
                          <Image
                            floated='left'
                            size='mini'
                            src={review.user.avatar}
                            rounded
                            />
                          <Card.Header>{review.user.username}</Card.Header>
                          <Card.Content style={{color:'grey'}}>
                            {moment(review.createdAt).fromNow()}
                            <Rating 
                              size='mini'
                              style={{marginLeft:10}}
                              defaultRating={review.rating} 
                              maxRating={5} 
                              disabled />
                          </Card.Content>
                          <Card.Description style={{wordWrap: 'break-word'}}>
                            {review.body}
                          {user && user.id === review.user.id && (
                            <DeleteButton type='review' parentId={product.id} childId={review.id} />
                          )}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                    </Transition.Group>
                  )}
              </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
  }
  return productMarkup
}


export default withRouter(SingleProduct)