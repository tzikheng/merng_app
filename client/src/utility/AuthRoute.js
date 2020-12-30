import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../context/auth.js'

function AuthRoute({ component: Component, ...rest}){
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render = {(props) => 
        user ? <Redirect to = '/'/> : <Component {...props}/>
      }
    />
  )
}

export default AuthRoute

// e.g. of {component, ...rest}:
// const person = {
//   name: 'John',
//   age: 35,
//   sex: 'M'
// };

// const { name: Username, ...rest } = person
// --> person.Username = 'John', person.age = 35 etc