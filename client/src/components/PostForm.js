import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Card, Form, Grid } from 'semantic-ui-react'
import { CREATE_POST_MUTATION, GET_POSTS_QUERY} from '../utility/graphql.js'
import { AuthContext } from '../context/auth.js'

function PostForm() {
  const { user } = useContext(AuthContext)
  const color = (user? (user.color || 'black') : 'black')
  const [postInput, setPostInput] = useState('');
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: {body:postInput},
    update(proxy, result){
      const data = proxy.readQuery({query: GET_POSTS_QUERY})
      proxy.writeQuery({
        query: GET_POSTS_QUERY, 
        data:{posts: [result.data.createPost, ...data.posts]} // rewriting the ATTRIBUTE of the OBJECT data
      });
      setPostInput('')
    }
  });
  
  return (
    <Card fluid color={color} style={{height: 170, width: 350, margin: 10}}>
      <Card.Content>
        {user ? (
          <>
            <Card.Header>{'New Post'}</Card.Header>
              <Form onSubmit={createPost}>
                <Form.Field>
                  <Form.Input id='FormInput'
                    placeholder={'Share something!'}
                    name='body'
                    value = {postInput}
                    onChange={(event) => setPostInput(event.target.value)}
                    style={{marginTop:22, marginBottom:16}}
                    />
                </Form.Field>
                <button
                  type="submit"
                  className={`ui button ${color}`}
                  disabled={postInput.trim() === '' || loading}
                  onClick={createPost}
                  >
                  Post
                </button>
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

export default PostForm