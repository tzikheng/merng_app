import { useQuery } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { isMobile } from "react-device-detect"
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Grid, Transition } from 'semantic-ui-react'
import CartItemCard from '../components/CartItemCard.js'
import { AuthContext } from '../context/auth'
import store from '../Store'
import { fnNumItems, fnTotalPrice, keyValueArray } from '../utility/functions'
import { GET_CART } from '../utility/gql_2.js'

function Cart(props) {
  const { user } = useContext(AuthContext)
  const color = (user ? user.color : 'black')
  const reduxCartObject = useSelector(state => state.cart) || {}
  const [reduxCart, setReduxCart] = useState(keyValueArray(reduxCartObject))
  const [numItems, setNumItems] = useState(fnNumItems(reduxCart))
  const [totalPrice, setTotalPrice] = useState(fnTotalPrice(reduxCart))
  // const { loading, error, data } = useQuery(GET_CART)

  store.subscribe(()=>{
    setReduxCart(keyValueArray(reduxCartObject))
    setNumItems(fnNumItems(reduxCart))
    setTotalPrice(fnTotalPrice(reduxCart))
  })
  let cartMarkup

  if(isMobile){
    return <h2>{`Mobile content not available yet!`}</h2>
  } else {
  //   if(error){
  //     console.log(error)
  //     cartMarkup = (
  //       <p>{'Error encountered...'}</p>
  //     )
  //   } else if(loading){
  //     cartMarkup = (
  //       <Grid columns={4}>
  //           <Grid.Row className='page-title'>
  //             <h1>{'Loading...'}</h1>
  //           </Grid.Row>
  //       </Grid>
  //     )
  //   } else {
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
                {reduxCart && (
                  <Transition.Group>
                    {reduxCart.map((cartItem)=>(
                      cartItem.quantity === 0 
                      ? null
                      : <CartItemCard color={color} cartItem={cartItem} key={cartItem.productId}/>
                    ))}
                  </Transition.Group>
                )}
            </Grid.Column>
            <Grid.Column width={4} style={{textAlign:'right', marginTop:50}}>
              <h4 style={{marginTop:5}}>{`Total number of items: ${numItems}`}</h4>
              <h4 style={{marginTop:5}}>{`Free shipping!`}</h4>
              <h3 style={{marginTop:5}}>{`Your total: $${totalPrice}`}</h3>
              <Button color={color} size='tiny' disabled>{`Checkout`}</Button>
              <h6>{`Work In Progress.`}</h6>
            </Grid.Column>
        </Grid>
        )
      }
    }
    return cartMarkup
  }
// }

export default withRouter(Cart)