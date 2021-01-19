export const addToCart = (productId, price) => {
  return {
    type: 'addToCart',
    productId, 
    price
  }
}

export const removeFromCart = (productId) => {
  return {
    type: 'removeFromCart',
    productId
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