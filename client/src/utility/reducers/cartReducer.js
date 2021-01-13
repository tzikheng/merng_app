const cartReducer = (state={}, action) => {
  switch (action.type) {
    case 'addToCart':
      state[action.payload] = (state[action.payload]||0) + 1
      return state
    case 'removeFromCart':
      if (state[action.payload === 1]){
        delete state[action.payload] // FIXME: not deleting item from store
      } else {
        state[action.payload] = state[action.payload] - 1
      }
      return state
    default:
      return state
  }
}

export default cartReducer