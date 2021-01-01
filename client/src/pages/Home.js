import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard.js'
import PostForm from '../components/PostForm.js'
import { GET_POSTS_QUERY } from '../utility/gql_1.js'

function Home() {
  const { loading, error, data} = useQuery(GET_POSTS_QUERY)
  if(error){
    console.log(error)
    return <p>{'Error encountered...'}</p>
  } else if(loading){
    return (
      <Grid columns={4}>
          <Grid.Row className='page-title'>
            <h1>{'Loading...'}</h1>
          </Grid.Row>
      </Grid>
    )
  } else {
      return (
      <Grid>
        <Grid.Row className='page-title'>
          <h1>{data.posts ? 'Recent posts' : 'No posts yet'}</h1>
        </Grid.Row>
        <Grid.Row>
        <Card.Group centered>
          <Grid.Column>
            <PostForm/>
          </Grid.Column>
          {data.posts && (
            <Transition.Group>
              {data.posts.map((post)=>(
                <Grid.Column key={post.id}>
                  <PostCard post={post}/>
                </Grid.Column>
                ))}
              </Transition.Group>
                )}
        </Card.Group>
        </Grid.Row>
      </Grid>
      )
  }
}

export default withRouter(Home)