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

export const updateCart = (productId, quantity) => {
  return {
    type: 'updateCart',
    productId,
    quantity
  }
}

export const reduxLogout = () => {
  return {
    type: 'reduxLogout'
  }
}