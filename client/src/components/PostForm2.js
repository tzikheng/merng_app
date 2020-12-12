import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Card, Form, Grid } from 'semantic-ui-react'
import { useForm } from '../utility/hooks'
import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from '../utility/graphql.js'
import { AuthContext } from '../context/auth.js'

function PostForm2() {
  const { user } = useContext(AuthContext)
  const color = localStorage.getItem('color') || 'black'
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
      const data = proxy.readQuery({query: GET_POSTS_QUERY})
      proxy.writeQuery({
        query: GET_POSTS_QUERY, 
        data:{posts: [result.data.createPost, ...data.posts]} // rewriting the ATTRIBUTE of the OBJECT data
      });
    }
  })
  function createPostCallback(){createPost()}
  
  return (
    <Card fluid color={color} style={{height: 170, width: 350, margin: 10}}>
      <Card.Content>
        {user ? (
          <>
            <Card.Header>{'New Post'}</Card.Header>
              <Form onSubmit={onSubmit}>
                <Form.Field>
                  <Form.Input id='FormInput'
                    placeholder={error? 'Post cannot be blank!':'Share something!'}
                    name='body'
                    onChange={onChange}
                    value = {values.body}
                    error = {error? true:false}
                    style={{marginTop:22, marginBottom:16}}
                    />
                </Form.Field>
                <Button type='submit' color={color}>
                  Submit
                </Button>
              </Form>
          </>
        ) : (
          <Grid>
            <Grid verticalAlign='middle' columns={1} centered>
              <Grid.Row>
                <Grid.Column>
                  <h2>{'Log in to share!'}</h2>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid>
        )}
      </Card.Content>
    </Card>
  )
}

export default PostForm2