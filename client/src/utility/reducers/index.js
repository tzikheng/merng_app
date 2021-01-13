import cartReducer from './cartReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  cart: cartReducer
})

export default allReducers