import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Grid, Image, Item, Popup } from 'semantic-ui-react'
import { updateCart } from '../utility/actions'
import { GET_PRODUCT_QUERY, UPDATE_CART } from '../utility/gql_2.js'

// FIXME: this is a disaster
// Redux state -> display cart & cart items
// Update change -> change redux state -> update storage -> update userQuantity -> if 0, return null

function CartItemCard({color, cartItem: {productId}}) {
  const reduxCart = useSelector(state => state.cart)
  const [ itemInfo, setItemInfo ] = useState({})
  const [ feQuantity, setFeQuantity ] = useState(reduxCart[productId][1]) // uses redux store to update quantity
  const [ beQuantity, setBeQuantity ] = useState(reduxCart[productId][1])
  const dispatch = useDispatch()
  
  const { loading: getItemLoading, _, data: itemData } = useQuery(GET_PRODUCT_QUERY, {
    variables: { productId },
    onError(error){console.log(error)}
  })
  const [ updateUserCart, { loading: updateCartLoading, data: cartData } ] = useMutation(UPDATE_CART, {
    variables: { productId, quantity: feQuantity },
    onCompleted(){
      setBeQuantity([beQuantity[0], feQuantity])
    }
  })
  useEffect(() => {
    if(!getItemLoading && itemData){
      setItemInfo(itemData.getProduct)
    }
    // if(!updateCartLoading && cartData){
    //   let cartItem = cartData.updateCart.cart.find((cartItem)=>cartItem.productId === productId)
    //   setBeQuantity([cartItem.quantity])
    // }
  }, [getItemLoading, itemData, updateCartLoading, cartData])
  function updateCartHandle(){
    dispatch(updateCart(productId, feQuantity))
    updateUserCart(productId, feQuantity)
  }
  
  let cartItemMarkup 
  if (getItemLoading) {
    cartItemMarkup = (
      <Item.Group divided unstackable>
        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png'/>
          <Item.Content>
            <Item.Header as='a'>{'Loading...'}</Item.Header>
            <Item.Description>
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  } else if (beQuantity === 0) {
    return null
  } else if (itemInfo !== {}) {
    cartItemMarkup = (
      <>
      <Grid>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column width={3}>
            <Image src={itemInfo.images}/>
          </Grid.Column>
          <Grid.Column width={6}>
            <h3 style={{textAlign:'left', margin:0}}>{itemInfo.product_name}</h3>
            <h4 style={{textAlign:'left', margin:0}}>{`$${itemInfo.price}`}</h4>
            <p style={{textAlign:'left', margin:0, fontSize:12, color:'grey'}}>{itemInfo.condition}</p>
            {itemInfo.user && <p style={{textAlign:'left', margin:0, fontSize:12, color:'grey'}}>{`Listed by ${itemInfo.user.username}`}</p>}
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid centered>
              <Grid.Row verticalAlign='middle'>
                <Button 
                  basic
                  color={color}
                  size='mini' 
                  icon='minus'
                  onClick={()=>setFeQuantity(feQuantity-1)}
                  disabled={updateCartLoading || feQuantity===0}/>
                <Grid.Column width={4}>
                <Popup 
                  inverted
                  content={'Quantity'} 
                  trigger={
                    <h3 style={{textAlign:'center'}}>{feQuantity}</h3>
                  }/>
                </Grid.Column>
                <Button 
                  basic
                  color={color}
                  size='mini' 
                  icon='plus'
                  onClick={()=>setFeQuantity(feQuantity+1)}
                  disabled={updateCartLoading}/>
                <Popup 
                  inverted
                  content={feQuantity===0?'Remove item' :'Update quantity'}
                  trigger={
                    <Button 
                      basic
                      color={color}
                      size='mini'
                      icon={feQuantity===0?'trash' :'check'}
                      onClick={updateCartHandle}
                      loading={updateCartLoading}
                      disabled={updateCartLoading}/>
                  }/>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider/>
      </>
    )
  }

  return cartItemMarkup
}

export default CartItemCard