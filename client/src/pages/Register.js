import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../utility/hooks'
import { AuthContext } from '../context/auth'
import { REGISTER_USER } from '../utility/graphql.js'

function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const { onChange, onSubmit, values } = useForm(addUserCallback, {
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const [addUser, { loading }] = useMutation(REGISTER_USER,{
    variables: values,
    onError(error){
      console.log(error)
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    onCompleted(data){
      context.login(data.register)
      props.history.push('/')
    }
  })
  function addUserCallback(){addUser()}
  
  return (
    <div className='form-container'>
      <h1>Register</h1>
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
          label='Email'
          placeholder='Email...'
          name='email'
          type='text'
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password...'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type='submit'>
          Register
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

export default Register