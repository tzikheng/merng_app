export const addToCart = (productId) => {
  return {
    type: 'addToCart',
    payload: productId
  }
}

export const removeFromCart = (productId) => {
  return {
    type: 'removeFromCart',
    payload: productId
  }
}