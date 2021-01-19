import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { LIKE_POST_MUTATION } from '../utility/gql_1.js'
import { AuthContext } from '../context/auth'
import { LIKE_PRODUCT_MUTATION } from '../utility/gql_2.js'

function LikeButton({type, size='mini', item: { id, likeCount, likes } }){
  const [liked, setLiked] = useState(false)
  const { user } = useContext(AuthContext)
  const color = (user ? user.color : 'black')

  useEffect(() => {
    if (user && likes.find((like) => like.user.id === user.id)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])
  
  let mutation 
  let variables

  switch(type){
    case 'post':
      mutation = LIKE_POST_MUTATION
      variables = { postId: id }
      break
    case 'product':
      mutation = LIKE_PRODUCT_MUTATION
      variables = { productId: id }
      break
    default:
      mutation = null
      variables = null
    }

  const [likeType, { loading }] = useMutation(
    mutation,{
    variables,
  })

const likeButton = user ? (
  liked ? (
    <Button 
    disabled={loading}  
    loading={loading} 
      color={color} 
      onClick={likeType} 
      size={size}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button 
    disabled={loading}  
    loading={loading} 
      color={color} basic 
      onClick={likeType} 
      size={size}>
      <Icon name="heart" />
    </Button>
  )
) : (
  <Button 
    basic
    color={color} 
    as={Link} 
    to="/login"
    size={size}>
    <Icon name="heart" />
  </Button>
)

const popupContent = user ? (
  liked ? ( 
    `Unlike ${type==='product'?'item':type}`
    ) : (
      `Like ${type==='product'?'item':type}`
      )
  ) : (
    `Log in to like ${type==='product'?'item':type}`
  )

return (
  <Popup inverted content={popupContent} trigger={
    <Button 
      as="div"
      labelPosition="right"
      size={size}>
      {likeButton}
      <Label
        basic
        color={color}
        pointing="left">
        {likeCount}
      </Label>
    </Button>
  }/>
)
}

export default LikeButton