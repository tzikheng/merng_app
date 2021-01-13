import React, { useContext } from 'react'
import { Card, Header, Icon, Popup, Rating } from 'semantic-ui-react'
import DeleteButton from '../components/DeleteButton'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import UserAvatar from './UserAvatar'
import AddToCartButton from './AddToCartButton'
import { roundToX } from '../utility/functions'

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
      {user && user.id===product.user.id
        ? <DeleteButton type='product' float='right' parentId={product.id}/>
        : <AddToCartButton color={product.user.color} float='right' productId={product.id} quantity={1}/>
      }
    </>
  )
  // TODO: Make image a scrollable gallery
  
  const productCard = (
    <Card
      fluid
      color={product.user.color} 
      className='productCard'
      style={{
        height: 420, 
        width: 240, 
        margin: 5,
        backgroundColor: 'white'
      }}
      >
      <UserAvatar item={product}/>
        <a href={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            style={{objectFit:'contain', height:240, width: 240, backgroundColor:'white'}}
          />
        </a>
      <Card.Content
        href={`/products/${product.id}`}
        style={{marginTop:0}}>
        <Header size='small' style={{marginTop:-2, marginBottom:0}}>
          {product.product_name}
        </Header>
        <Header size='tiny' style={{marginTop:2, marginBottom:0}}>
          {`$${product.price}`}
        </Header>
        {product.reviewCount > 0 && (
          <Popup inverted 
            content={`${roundToX(product.avgRating,1)} stars based on ${product.reviewCount} review${product.reviewCount>1?`s`:``}`} 
            trigger={
          <div style={{display: 'flex', color:'black', marginBottom:-10, alignItems: 'center'}}>
            <Rating defaultRating={product.avgRating} maxRating={5} disabled style={{marginRight:10}}/>
            {product.reviewCount} 
            <Icon 
              name={product.reviewCount>1?'comments outline': 'comment outline'} 
              style={{marginLeft:3}}/>
          </div>
          }/>
        )}
      </Card.Content>
      <Card.Content extra>
        {extra}
      </Card.Content>
    </Card>
  )
  return(productCard)
}

export default ProductCard