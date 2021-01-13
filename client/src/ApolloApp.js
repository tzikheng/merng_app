import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { load, save } from 'redux-localstorage-simple'
import App from './App.js'
import allReducers from './utility/reducers'

const createStoreWithMiddleware = applyMiddleware(
  save() // Saving done here
)(createStore)

const store = createStoreWithMiddleware(
  allReducers,    
  load(), // Loading done here
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)    

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
  // uri: 'https://tk-app-1.herokuapp.com/'
})

const authLink = setContext(()=>{
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {Authorization: token ? `Bearer ${token}`:''}
  }
}) // TODO: gets the token once and passes it on

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </Provider>
)
