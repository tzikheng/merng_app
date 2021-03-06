import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Grid, Image, Item, Popup } from 'semantic-ui-react'
import { updateCart } from '../utility/actions'
import { GET_PRODUCT_QUERY, UPDATE_CART } from '../utility/gql_2.js'

function CartItemCard({color, shortened=false, cartItem: {productId}}) {
  const reduxCart = useSelector(state => state.cart)
  const [ itemInfo, setItemInfo ] = useState({})
  const [ feQuantity, setFeQuantity ] = useState(reduxCart[productId] && reduxCart[productId][1])
  const [ beQuantity, setBeQuantity ] = useState(reduxCart[productId] && reduxCart[productId][1])
  const dispatch = useDispatch()

  const { loading: getItemLoading, _, data: itemData } = useQuery(GET_PRODUCT_QUERY, {
    variables: { productId },
    onError(error){
      console.log(error)
      setFeQuantity(beQuantity)
    }
  })
  const [ updateUserCart, { loading: updateCartLoading, data: cartData } ] = useMutation(UPDATE_CART, {
    variables: { productId, quantity: feQuantity },
    onCompleted(){
      dispatch(updateCart({productId, quantity:feQuantity}))
      setBeQuantity(feQuantity)
    }
  })
  useEffect(() => {
    if(!getItemLoading && itemData){
      setItemInfo(itemData.getProduct)
    }
  }, [getItemLoading, itemData, updateCartLoading, cartData])
  function updateCartHandle(){
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
          <Grid.Column width={7}>
            {shortened
              ? <h4 style={{textAlign:'left', margin:0}}>
                  {itemInfo.product_name && itemInfo.product_name.length > 20 ?itemInfo.product_name.substring(0,20)+'...' :itemInfo.product_name}
                </h4>
              : <h3 style={{textAlign:'left', margin:0}}>
                {itemInfo.product_name && itemInfo.product_name.length > 20 ?itemInfo.product_name.substring(0,20)+'...' :itemInfo.product_name}
                </h3>
            }
            {shortened
              ? <h5 style={{textAlign:'left', margin:0}}>
                  {`$${itemInfo.price}`}
                </h5>
              : <h4 style={{textAlign:'left', margin:0}}>
                  {`$${itemInfo.price}`}
                </h4>
            }
            <p style={{textAlign:'left', margin:0, fontSize:12, color:'grey'}}>{itemInfo.condition}</p>
            {itemInfo.user && <p style={{textAlign:'left', margin:0, fontSize:12, color:'grey'}}>{`Listed by ${itemInfo.user.username}`}</p>}
          </Grid.Column>
          <Grid.Column width={5}>
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
                  position='top center'
                  trigger={
                    shortened
                    ? <h4>{feQuantity}</h4>
                    : <h3>{feQuantity}</h3>
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
                  content={feQuantity===0 ?'Remove item' :'Update quantity'}
                  position='top center'
                  trigger={
                    <Button 
                      basic
                      color={color}
                      size='mini'
                      icon={feQuantity===0 ?'trash' :'check'}
                      onClick={updateCartHandle}
                      loading={updateCartLoading}
                      disabled={updateCartLoading || (feQuantity === beQuantity)}/>
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