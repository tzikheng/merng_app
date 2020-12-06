import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Card, Form } from 'semantic-ui-react'
import { useForm } from '../utility/hooks'
import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from '../utility/graphql.js'
import { AuthContext } from '../context/auth.js'

function PostForm() {
  const { user } = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const { onChange, onSubmit, values } = useForm(createPostCallback,{
    body:''
  })
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION,{
    variables: values,
    onError(error){
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    update(proxy, result){
      const data = proxy.readQuery({query: GET_POSTS_QUERY}) // data is an OBJECT
      proxy.writeQuery({
        query: GET_POSTS_QUERY, 
        data:{getPosts: [result.data.createPost, ...data.getPosts]} // rewriting the ATTRIBUTE of the OBJECT data
      });
    // ,onCompleted(data){
    //   const newPost = data.createPost
    }
  })
  function createPostCallback(){createPost()}
  
  return (
    <Card fluid style={{height: 170, width: 350, margin: 10}}>
      <Card.Content>
        <Card.Header>{user?'New Post:':'Log in to start sharing!'}</Card.Header>
        {user && (
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <Form.Input
                placeholder={error? 'Post cannot be blank!':'Share something!'}
                name='body'
                onChange={onChange}
                value = {values.body}
                error = {error? true:false}
                style={{marginTop:22, marginBottom:16}}
                />
            </Form.Field>
            <Button type='submit' color='purple'>
              Submit
            </Button>
          </Form>
        )}
      </Card.Content>
    </Card>
  )
}

export default PostForm