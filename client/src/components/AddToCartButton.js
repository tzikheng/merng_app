import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { addToCart, removeFromCart } from '../utility/actions'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../utility/gql_2.js'

function AddToCartButton({ color='black', size='mini', float='right', productId}){
  const { user } = useContext(AuthContext)
  const reduxCart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [ inCart, setInCart ] = useState(reduxCart[productId])

  const [addToUserCart, { loading: addToUserCart_loading }] = useMutation(ADD_TO_CART,{
    variables: { productId }
  })
  const [removeFromUserCart, { loading: removeFromUserCart_loading }] = useMutation(REMOVE_FROM_CART,{
    variables: { productId }
  })
  function addToCartHandle(){
    dispatch(addToCart(productId))
    if(user){addToUserCart()}
    setInCart(true)
  }
  function removeFromCartHandle(){
    dispatch(removeFromCart(productId))
    if(user){removeFromUserCart()}
    setInCart(false)
  }

  const buttonMarkup = user 
    ? (
      <Popup 
        inverted
        content={inCart? 'Remove from cart': 'Add to cart'} 
        trigger={
        <Button 
          disabled={addToUserCart_loading||removeFromUserCart_loading}
          loading={addToUserCart_loading||removeFromUserCart_loading}
          basic={!inCart}
          color={color} 
          floated={float}
          size={size} 
          onClick={inCart
            ? removeFromCartHandle
            : addToCartHandle
          }
          >
          <Icon name="cart" style={{margin:0}}/>
        </Button>
        }/>
    ) : (
      <Popup 
        inverted
        content={'Log in to add to your cart'} 
        trigger={
        <Button 
          basic
          as={Link} 
          to="/login"
          color={color} 
          floated={float}
          size={size} 
          >
          <Icon name="cart" style={{margin:0}}/>
        </Button>
        }
      />
    )

  return buttonMarkup
}

export default AddToCartButton