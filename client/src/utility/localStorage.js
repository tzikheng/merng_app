// replaced by 'redux-localstorage-simple'
// <-- ApolloApp.js -->
// :BROKEN:
// import { loadCart, saveCart } from './utility/localStorage'
// const persistedCart = loadCart('cart')
// console.log('persisted state: ')
// console.log(typeof(persistedCart))
// console.log(persistedCart)
// const store = createStore(
//   allReducers,
//   persistedCart,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// store.subscribe(()=>{
//   console.log('from')
//   console.log(typeof(store.getState().cart))
//   console.log(store.getState().cart)
//   console.log('to')
//   console.log(typeof(JSON.stringify(store.getState().cart)))
//   console.log(JSON.stringify(store.getState().cart))
//   saveCart({
//     key: 'cart',
//     object: store.getState().cart
//   })
// })

export const loadCart = () => { // returns OBJECT
  try {
    const object = localStorage.getItem('cart')
    if (!object){
      return undefined
    }
    return JSON.parse(object)
  } catch(err) {
    return undefined
  }
}

export const saveCart = (state) => { // receive an OBJECT
  try {
    localStorage.setItem('cart', JSON.stringify(state))
  } catch(err) {
    return undefined
  }
}

