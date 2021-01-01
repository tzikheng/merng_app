import { AuthContext } from '../context/auth'
import moment from 'moment'
import React, { useContext } from 'react'
import { Card, Container, Image } from 'semantic-ui-react'
import DeleteButton from '../components/DeleteButton'
import CommentButton from './CommentButton'
import LikeButton from './LikeButton'

function ProductCard({product}){
  const { user } = useContext(AuthContext)

  const extra = (
    <>
    <LikeButton 
      color={product.user.color} 
      type='product'
      item={{
        id:product.id, 
        likeCount:product.likeCount, 
        likes:product.likes
      }}/>
      <CommentButton 
        color={product.user.color} 
        commentCount={product.commentCount||0} 
        popUp='Comments' 
        redirect={`/products/${product.id}`}
      />
      {user && user.id===product.user.id
        ? <DeleteButton type='product' float='right' parentId={product.id}/>
        : null
      }
    </>
  )
  // TODO: Make image a scrollable gallery

  return(
    <Card
      fluid
      color={product.user.color} 
      style={{height: 420, width: 240, margin: 5}}>
      <Image src={product.images[0]} style={{objectFit:'contain', height:260}} centered rounded/>
      <Card.Content>
        <Card.Header>{product.product_name}</Card.Header>
        <Card.Meta>
          {`by ${product.user.username}, ${moment(product.createdAt).fromNow()}`}
        </Card.Meta>
        <Card.Description>
          {product.description.length>50? product.description.substring(0,50)+'...':product.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {extra}
      </Card.Content>
    </Card>
  )
}

export default ProductCard;