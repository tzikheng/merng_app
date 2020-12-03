import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../utility/hooks'
import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../utility/graphql.js'

function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  })
  const [loginUser, { loading }] = useMutation(LOGIN_USER,{
    variables: values,
    onError(error){
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    onCompleted(data){
      context.login(data.login)
      props.history.push('/')
    }
  })
  function loginUserCallback(){loginUser()}
  // server-side validation in place so no client side validation required.
  // will send mutation to server and persist changes if valid
  
  return (
    <div className='form-container'>
      <h1>Login</h1>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''}> 
        <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit'>
          Login
        </Button>
      </Form>
      
      {Object.keys(errors).length > 0 &&(
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(value=>(
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Login