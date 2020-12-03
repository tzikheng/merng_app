import React, { Component } from 'react'
import App from './App.js'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
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
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)
