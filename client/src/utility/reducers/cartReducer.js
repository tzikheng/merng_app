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
      state[action.productId][1] = action.quantity
      return state

    case 'reduxLogout':
      state = {}
      return state 

    default:
      return state
  }
}

export default cartReducer