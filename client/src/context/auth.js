import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {user: null}

if(localStorage.getItem('jwtToken')){
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
  if(decodedToken.exp * 1000 < Date.now()){
    localStorage.removeItem('cart')
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('redux_localstorage_simple')
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  update: (userData) => {},
  logout: () => {}
})

function authReducer(state, action){
  switch(action.type){
    case 'LOGIN':
      return{...state, user: action.payload}
    case 'UPDATE':
      return{...state, user: action.payload}
    case 'LOGOUT':
      return{...state, user: null}
    default: 
      return state;
  }
}

function AuthProvider(props){
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData){
    localStorage.setItem('jwtToken', userData.token)
    dispatch({type: 'LOGIN', payload: userData})
  }
  function update(userData){
    localStorage.setItem('jwtToken', userData.token)
    dispatch({type: 'UPDATE', payload: userData})
  }
  function logout(){
    localStorage.removeItem('cart')
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('redux_localstorage_simple')
    dispatch({type: 'LOGOUT'})
  }

  return(
    <AuthContext.Provider
      value = {{user: state.user, login, update, logout}}
      {...props}
      />
  )
}

export { AuthContext, AuthProvider}

// login() -> change AuthContext