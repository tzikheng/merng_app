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

export const updateCart = (productId, price, quantity) => {
  return {
    type: 'updateCart',
    productId,
    price,
    quantity
  }
}

export const reduxLogin = (cart) => {
  return {
    type: 'reduxLogin',
    cart
  }
}

export const reduxLogout = () => {
  return {
    type: 'reduxLogout'
  }
}