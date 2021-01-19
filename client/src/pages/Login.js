import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../utility/gql_1.js'
import { useForm } from '../utility/hooks'

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
  
  const loginForm = (
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
  return loginForm
}

export default withRouter(Login)