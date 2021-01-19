import { useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { isMobile } from "react-device-detect"
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Grid, Transition } from 'semantic-ui-react'
import CartItemCard from '../components/CartItemCard.js'
import { dictToArray, fnNumItems, fnTotalPrice } from '../utility/functions'
import { GET_CART } from '../utility/gql_2.js'
// FIXME: useQuer(GET_CART) not re-running upon page reload

function Cart() {
  let reduxCartObject = useSelector(state => state.cart) || {}
  const [userCart, setUserCart] = useState()
  const [reduxCart, setReduxCart] = useState(dictToArray(reduxCartObject))
  const [numItems, setNumItems] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const { loading, error, data } = useQuery(GET_CART,{
    onCompleted(){
      setUserCart(data.getCart.cart)
      setNumItems(fnNumItems(data.getCart.cart))
      setTotalPrice(fnTotalPrice(data.getCart.cart))
    }
  })
  if(isMobile){
    return <h2>{`Mobile content not available yet!`}</h2>
  }
  else {
    let cartMarkup
    if(error){
      console.log(error)
      cartMarkup = (
        <p>{'Error encountered...'}</p>
      )
    } else if(loading){
      cartMarkup = (
        <Grid columns={4}>
            <Grid.Row className='page-title'>
              <h1>{'Loading...'}</h1>
            </Grid.Row>
        </Grid>
      )
    } else {
      if (numItems===0) {
        cartMarkup = (
          <Grid columns={4}>
              <Grid.Row className='page-title'>
                <h1>{'Your cart is empty'}</h1>
              </Grid.Row>
          </Grid>
        )
      } else {
        cartMarkup = (
        <Grid centered>
          <Grid.Row className='page-title'>
            <h1>{'Your cart'}</h1>
          </Grid.Row>
          <Grid.Row/>
            <Grid.Column width={8}>
                {userCart && (
                  <Transition.Group>
                    {userCart.map((cartItem)=>(
                      cartItem.quantity === 0 
                      ? null
                      : <CartItemCard cartItem={cartItem} key={cartItem.productId}/>
                    ))}
                  </Transition.Group>
                )}
            </Grid.Column>
            <Grid.Column width={4} style={{textAlign:'right', marginTop:50}}>
              <h4 style={{marginTop:10}}>{`Total no. items: ${numItems}`}</h4>
              {totalPrice >= 20
                ? <h4 style={{marginTop:10}}>Free shipping</h4>
                : <h4 style={{marginTop:10}}>Shipping: $5</h4>
              }
              <h3 style={{marginTop:10}}>{`Your total: $${totalPrice}`}</h3>
              <Button size='tiny' disabled>Checkout</Button>
            </Grid.Column>
        </Grid>
        )
      }
    }
    return cartMarkup
  }
}

export default withRouter(Cart)