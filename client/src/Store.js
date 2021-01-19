
import { applyMiddleware, createStore } from 'redux'
import { load, save } from 'redux-localstorage-simple'
import allReducers from './utility/reducers'


const createStoreWithMiddleware = applyMiddleware(
  save() // Saving done here
)(createStore)

const Store = createStoreWithMiddleware(
  allReducers,    
  load(), // Loading done here
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default Store