// cart = { productId: [price, quantity], ...}

const cartReducer = (state={}, action) => {
  switch (action.type) {
    case 'addToCart':
      if (state[action.productId]) {
        state[action.productId][1] = (state[action.productId][1]||0) + 1
      } else {
        state[action.productId] = [action.price, 1]
      }
      return state

    case 'removeFromCart':
      if (state[action.productId]) {
        delete state[action.productId]
      }
      return state

    case 'updateCart':
      if (state[action.productId]) {
        state[action.productId][1] = action.quantity
      }
      else {
        state[action.productId] = [action.price, action.quantity]
      }
      return state

    case 'reduxLogin':
      action.cart.forEach((cartItem) => {
        state[cartItem['productId']] = [cartItem['price'], cartItem['quantity']]
      })
      return state 
      
    case 'reduxLogout':
      state = {}
      return state 

    default:
      return state
  }
}

export default cartReducer